// app/routes/bad-parking.tsx
import { useLoaderData, Form } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import DropUpButton from "~/components/DropUpButton";

export const loader: LoaderFunction = async () => {
  const axios = (await import("axios")).default;

  const PINATA_API_KEY = process.env.PINATA_API_KEY;
  const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;

  if (!PINATA_API_KEY || !PINATA_SECRET_API_KEY) {
    console.error("Pinata API keys are not set.");
    return { error: "Server configuration error." };
  }

  try {
    // Fetch the list of files from Pinata
    const response = await axios.get("https://api.pinata.cloud/data/pinList", {
      params: {
        status: "pinned",
        pageLimit: 1000, // Adjust as necessary
      },
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
      },
    });

    // Extract the relevant data
    const files = response.data.rows;

    // Filter files that have the 'date' key in metadata
    const posts = files.filter(
      (file) =>
        file.metadata &&
        file.metadata.keyvalues &&
        file.metadata.keyvalues.date
    );

    // Sort files from oldest to newest
    posts.sort(
      (a, b) =>
        new Date(a.metadata.keyvalues.date).getTime() -
        new Date(b.metadata.keyvalues.date).getTime()
    );

    return posts;
  } catch (error) {
    console.error("Error retrieving files from Pinata:", error);
    return { error: "Failed to retrieve data from Pinata." };
  }
};

export const action: ActionFunction = async ({ request }) => {
  const axios = (await import("axios")).default;
  const FormData = (await import("form-data")).default;

  const formData = await request.formData();
  const image = formData.get("image") as File;

  if (!image || typeof image.arrayBuffer !== "function") {
    return { error: "Image is required." };
  }

  const date = new Date().toISOString();

  // Set your Pinata API key and secret
  const PINATA_API_KEY = process.env.PINATA_API_KEY;
  const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;

  if (!PINATA_API_KEY || !PINATA_SECRET_API_KEY) {
    console.error("Pinata API keys are not set.");
    return { error: "Server configuration error." };
  }

  const data = new FormData();

  // Convert the image to a Buffer
  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  data.append("file", buffer, {
    filename: image.name || "image.jpg",
    contentType: image.type || "application/octet-stream",
  });

  const metadata = JSON.stringify({
    name: image.name || "image.jpg",
    keyvalues: {
      date: date,
    },
  });
  data.append("pinataMetadata", metadata);

  // Set wrapWithDirectory to false
  const options = JSON.stringify({
    wrapWithDirectory: false,
  });
  data.append("pinataOptions", options);

  try {
    // Make the POST request to Pinata
    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data,
      {
        maxBodyLength: Infinity, // Prevent axios from erroring out with large files
        headers: {
          ...data.getHeaders(),
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY,
        },
      }
    );

    // Handle the response from Pinata
    const { IpfsHash } = response.data;
    console.log("Pinned to IPFS with hash:", IpfsHash);

    // After successful upload, redirect back to the same page to trigger loader
    return null;
  } catch (error) {
    console.error("Error pinning to Pinata:", error);
    return { error: "Failed to pin data to Pinata." };
  }
};

export default function BadParking() {
  const data = useLoaderData();

  if (data.error) {
    return <div>Error: {data.error}</div>;
  }

  const posts = data;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-orange-500 text-white py-4">
        <h1 className="text-center text-3xl font-bold">Comets Can't Park</h1>
      </header>

      {/* Main Content */}
      <main className="p-4 max-w-4xl mx-auto w-full">
        {/* Add Post Form */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-orange-500">
            Add a New Post
          </h2>
          <Form
            method="post"
            encType="multipart/form-data"
            className="flex flex-col md:flex-row items-start md:items-center gap-4"
          >
            {/* Image File Input */}
            <input
              type="file"
              name="image"
              accept="image/*"
              required
              className="flex-1 p-2 border border-orange-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {/* Submit Button */}
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
            >
              Add Post
            </button>
          </Form>
        </div>

        {/* Feed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div
              key={post.ipfs_pin_hash}
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
            >
              <img
                src={`https://gateway.pinata.cloud/ipfs/${post.ipfs_pin_hash}`}
                alt={`Post ${post.metadata.name}`}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 bg-orange-500 text-white text-sm mt-auto">
                {new Date(post.metadata.keyvalues.date).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
        <DropUpButton pageType="aboutUs" /> {/* Add the DropUpButton here */}
      </main>

      {/* Footer */}
      <footer className="bg-orange-500 text-white py-4 mt-8">
        <p className="text-center">
          &copy; {new Date().getFullYear()} Comets Can't Park
        </p>
      </footer>
    </div>
  );
}
