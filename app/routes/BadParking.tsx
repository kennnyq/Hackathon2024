import React from 'react';

const CometsCantPark = () => {
  const posts = [
    {
      date: '2023-10-01',
      image: 'https://source.unsplash.com/random/800x600?car',
    },
    {
      date: '2023-10-02',
      image: 'https://source.unsplash.com/random/800x600?parking',
    },
    {
      date: '2023-10-03',
      image: 'https://source.unsplash.com/random/800x600?traffic',
    },
    {
      date: '2023-10-04',
      image: 'https://source.unsplash.com/random/800x600?city',
    },
    {
      date: '2023-10-05',
      image: 'https://source.unsplash.com/random/800x600?street',
    },
    {
      date: '2023-10-06',
      image: 'https://source.unsplash.com/random/800x600?road',
    },
    {
      date: '2023-10-07',
      image: 'https://source.unsplash.com/random/800x600?vehicle',
    },
    {
      date: '2023-10-08',
      image: 'https://source.unsplash.com/random/800x600?accident',
    },
    {
      date: '2023-10-09',
      image: 'https://source.unsplash.com/random/800x600?sign',
    },
    {
      date: '2023-10-10',
      image: 'https://source.unsplash.com/random/800x600?map',
    },
    {
      date: '2023-10-11',
      image: 'https://source.unsplash.com/random/800x600?navigation',
    },
    {
      date: '2023-10-12',
      image: 'https://source.unsplash.com/random/800x600?gps',
    },
    // Add more posts as needed
  ];

  const placeholderImage =
    'https://via.placeholder.com/800x600?text=No+Image+Available';

  const PostItems = posts.map((post, index) => (
    <div
      key={index}
      className="bg-white m-4 rounded-lg shadow-lg w-full max-w-2xl overflow-hidden"
    >
      {/* Date Section */}
      <div className="bg-gray-200 p-4">
        <div className="text-gray-700 text-sm font-medium">
          {new Date(post.date).toLocaleDateString()}
        </div>
      </div>
      {/* Image Section */}
      <div className="w-full">
        <img
          src={post.image}
          alt="Post"
          className="object-cover w-full h-80"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = placeholderImage;
          }}
        />
      </div>
    </div>
  ));

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
      <header className="text-5xl font-bold text-gray-800 mb-8">
        Comets Can't Park
      </header>
      <div className="w-full flex flex-col items-center">
        {PostItems}
      </div>
    </div>
  );
};

export default CometsCantPark;
