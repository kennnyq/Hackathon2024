// app/routes/review.tsx
import { ActionFunction, json, redirect } from '@remix-run/node';
import {
  Form,
  useActionData,
  useNavigation,
} from '@remix-run/react';
import { useState } from 'react';
import {
  unstable_parseMultipartFormData,
  unstable_createMemoryUploadHandler,
} from '@remix-run/node';
import PinataClient from '@pinata/sdk';
import { Readable } from 'stream';

type ActionData = {
  error?: string;
};

export const action: ActionFunction = async ({ request }) => {
  // Initialize the upload handler with the correct option
  const uploadHandler = unstable_createMemoryUploadHandler({
    maxSize: 5_000_000, // 5 MB limit
  });
  
  // Parse the multipart form data
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);

  const rating = formData.get('rating');
  const image = formData.get('image');

  // Validate the rating
  if (!rating || typeof rating !== 'string') {
    return json<ActionData>({ error: 'Rating is required.' }, { status: 400 });
  }

  const ratingNumber = parseInt(rating, 10);
  if (isNaN(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
    return json<ActionData>({ error: 'Rating must be between 1 and 5.' }, { status: 400 });
  }

  // Initialize Pinata client
  const pinataApiKey = process.env.PINATA_API_KEY;
  const pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY;

  if (!pinataApiKey || !pinataSecretApiKey) {
    return json<ActionData>({ error: 'Pinata API keys are not configured.' }, { status: 500 });
  }

  const pinata = new PinataClient(pinataApiKey, pinataSecretApiKey);

  let imageHash: string | undefined;

  // Handle optional image upload
  if (image && typeof image !== 'string') { // Uploaded files are not strings
    try {
      // Convert the uploaded image to a Buffer
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const stream = Readable.from(buffer);

      // Upload the image to Pinata
      const result = await pinata.pinFileToIPFS(stream, {
        pinataMetadata: {
          name: image.name || 'uploaded-image',
        },
      });

      imageHash = result.IpfsHash;
      console.log('Image uploaded to Pinata with hash:', imageHash);
    } catch (error: any) {
      console.error('Error uploading image to Pinata:', error);
      return json<ActionData>({ error: 'Failed to upload image. Please try again.' }, { status: 500 });
    }
  }

  // Prepare the review data
  const reviewData: { rating: number; imageHash?: string } = {
    rating: ratingNumber,
  };

  if (imageHash) {
    reviewData.imageHash = imageHash;
  }

  try {
    // Upload the review data as JSON to Pinata
    const jsonResult = await pinata.pinJSONToIPFS(reviewData, {
      pinataMetadata: {
        name: 'Review Data',
      },
    });

    const reviewHash = jsonResult.IpfsHash;
    console.log('Review data uploaded to Pinata with hash:', reviewHash);
  } catch (error: any) {
    console.error('Error uploading review data to Pinata:', error);
    return json<ActionData>({ error: 'Failed to upload review data. Please try again.' }, { status: 500 });
  }

  // Redirect to the thank-you page upon successful submission
  return redirect('/thanks');
};

export default function Review() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  return (
    <Form method="post" encType="multipart/form-data" className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Submit Your Review</h2>

      {actionData?.error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {actionData.error}
        </div>
      )}

      <div className="mb-4">
        <label className="block mb-2">Rating:</label>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              className={`text-3xl focus:outline-none ${
                rating >= star ? 'text-yellow-500' : 'text-gray-400'
              }`}
              onClick={() => handleStarClick(star)}
            >
              &#9733;
            </button>
          ))}
        </div>
        <p className="mt-2">Your rating: {rating} star{rating !== 1 ? 's' : ''}</p>
        {/* Visible and read-only input for rating */}
        <input
          type="number"
          name="rating"
          value={rating}
          readOnly
          className="mt-2 border rounded w-full px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Upload Image (optional):</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
        />
      </div>

      <button
        type="submit"
        disabled={navigation.state === 'submitting'}
        className={`w-full py-2 px-4 rounded ${
          navigation.state === 'submitting'
            ? 'bg-blue-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white`}
      >
        {navigation.state === 'submitting' ? 'Submitting...' : 'Submit Review'}
      </button>
    </Form>
  );
}
