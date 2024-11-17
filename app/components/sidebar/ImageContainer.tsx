import React from 'react';

const ImageContainer = () => {
  const arr = [
    {
      stars: 4,
      image: 'image1.jpg',
    },
    {
      stars: 5,
      image: 'image2.jpg',
    },
    {
      stars: 3,
      image: 'image3.jpg',
    },
    // Add more reviews as needed
  ];

  const Images = arr.map((item, i) => (
    <div key={i} className="bg-white p-4 mb-4 rounded-lg shadow-md w-full">
      {/* Stars */}
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`h-5 w-5 ${
              index < item.stars ? 'text-yellow-500' : 'text-gray-500'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.959a1 1 0 00.95.69h4.13c.969 0 1.371 1.24.588 1.81l-3.34 2.423a1 1 0 00-.364 1.118l1.286 3.959c.3.921-.755 1.688-1.54 1.118l-3.34-2.423a1 1 0 00-1.176 0l-3.34 2.423c-.785.57-1.84-.197-1.54-1.118l1.286-3.959a1 1 0 00-.364-1.118L2.097 9.386c-.783-.57-.38-1.81.588-1.81h4.13a1 1 0 00.95-.69l1.286-3.959z" />
          </svg>
        ))}
      </div>
      {/* Image */}
      <div className="mt-2">
        <div className="w-full aspect-w-16 aspect-h-9">
          <img
            src={item.image}
            alt="Review"
            className="object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  ));

  return <div>{Images}</div>;
};

export default ImageContainer;
