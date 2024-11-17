import React from 'react'
import { Review } from '~/utils/types'
import { StarRatingDisplay } from './Sidebar'
import { timeAgo } from '~/utils/utils'

const ImageContainer = ({ reviews }: { reviews: Review[] }) => {
  const Images = reviews.map((val: Review, i: any) => (
    <div
      key={i}
      className="bg-white mb-4 w-full border-b-[1px] last:border-0 border-gray-300"
    >
      <div className="px-6 pt-3">
        <div className="w-full aspect-w-16 aspect-h-9">
          <div className="rounded-lg my-4 overflow-hidden">
            <img
              src={val.imagePath}
              alt="Review"
              className="object-cover bg-clip-content max-h-56 w-full"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center pb-4">
            <StarRatingDisplay rating={val.rating} size={24} />
          </div>
          <div>{timeAgo(val.dateTime)}</div>
        </div>
      </div>
    </div>
  ))

  return <div className="">{Images}</div>
}

export default ImageContainer
