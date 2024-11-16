import React, { useState } from 'react'
import { Form, useActionData } from '@remix-run/react'
import StarRating from './StarRating'
import { unstable_parseMultipartFormData } from '@remix-run/node'

const RatingForm = () => {
  const [rating, setRating] = useState<number | null>(null)

  return (
    <Form
      method="post"
      className="w-full border-b-[1px] border-gray-300 py-4 px-6"
    >
      {/* <div className='flex items-center justify-between'> */}
      <h2 className="font-medium">Add a rating</h2>
      {/* </div> */}
      <StarRating setRating={setRating} rating={rating} size={34} />
      <div
        className="w-full h-40 my-4 bg-slate-50 border-gray-300 border-[1px]
        border-dashed rounded-lg flex justify-center items-center cursor-pointer"
      >
        <div className="flex flex-col items-center text-gray-400">
          <img src="/camera.svg" className="w-9 h-9" />
          <p className="text-sm font-medium">Upload a photo</p>
        </div>
      </div>
      <input
        type="hidden"
        name="rating"
        value={rating !== null ? rating : ''}
      />
      <button
        className={`ml-auto block h-10 w-28 rounded-md my-1
          transition ease-in-out duration-75 font-medium
          ${
            rating !== null
              ? 'text-white bg-[#42ad64]'
              : 'text-gray-300 bg-gray-200 cursor-default'
          }`}
        onClick={() => {}}
        disabled={rating === null}
      >
        Post
      </button>
    </Form>
  )
}

export default RatingForm
