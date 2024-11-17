// app/routes/BadParking.jsx
import { useState } from "react";
import DropUpButton from '~/components/DropUpButton'; // Import the DropUpButton

export default function BadParking() {
  // Initialize state with sample posts
  const [posts, setPosts] = useState([
    {
      id: 1,
      imageUrl: "https://via.placeholder.com/600x400?text=First+Post",
      date: "2024-04-25",
    },
    {
      id: 2,
      imageUrl: "https://via.placeholder.com/600x400?text=Second+Post",
      date: "2024-04-26",
    },
    // Add more initial posts as needed
  ]);

  // Handler to add a new post
  const addPost = (imageUrl) => {
    const newPost = {
      id: posts.length + 1,
      imageUrl,
      date: new Date().toISOString(),
    };
    setPosts([newPost, ...posts]);
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const file = form.imageFile.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        addPost(reader.result);
        form.reset();
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-orange-500 text-white py-4">
        <h1 className="text-center text-3xl font-bold">Comets Can't Park</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        {/* Add Post Form */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-orange-500">Add a New Post</h2>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-start md:items-center gap-4">
            {/* Image File Input */}
            <input
              type="file"
              name="imageFile"
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
          </form>
        </div>

        {/* Feed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
            >
              <img
                src={post.imageUrl}
                alt={`Post ${post.id}`}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 bg-orange-500 text-white text-sm mt-auto">
                {new Date(post.date).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
        <DropUpButton pageType="aboutUs" /> {/* Add the DropUpButton here */}
      </main>

      {/* Footer */}
      <footer className="bg-orange-500 text-white py-4 mt-8">
        <p className="text-center">&copy; {new Date().getFullYear()} Comets Can't Park</p>
      </footer>
    </div>
  );
}
