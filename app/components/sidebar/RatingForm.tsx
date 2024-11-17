import React, { useState, useRef } from 'react';
import { Form } from '@remix-run/react';
import StarRating from './StarRating';

const RatingForm = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Optionally, display a preview of the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form
      method="post"
      encType="multipart/form-data"
      className="w-full border-b-[1px] border-gray-300 py-4 px-6"
    >
      <h2 className="font-medium">Add a rating</h2>
      <StarRating setRating={setRating} rating={rating} size={34} />
      <input type="hidden" name="rating" value={rating ?? ''} />
      <input
        type="file"
        name="image"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      <div
        onClick={handleDivClick}
        className="w-full h-40 my-4 bg-slate-50 border-gray-300 border-[1px] border-dashed rounded-lg flex justify-center items-center cursor-pointer"
      >
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Preview"
            className="object-cover h-full w-full rounded-lg"
          />
        ) : (
          <div className="flex flex-col items-center text-gray-400">
            <img src="/camera.svg" alt="Upload" className="w-9 h-9" />
            <p className="text-sm font-medium">Upload a photo</p>
          </div>
        )}
      </div>
      <button
        type="submit"
        disabled={rating === null}
        className={`ml-auto block h-10 w-28 rounded-md my-1 transition ease-in-out duration-75 font-medium ${
          rating !== null
            ? 'text-white bg-[#42ad64]'
            : 'text-gray-300 bg-gray-200 cursor-default'
        }`}
      >
        Post
      </button>
    </Form>
  );
};

export default RatingForm;