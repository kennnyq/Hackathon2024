import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import RatingForm from './RatingForm'
import { Color, Review } from '~/utils/types'
import { kebabCase } from '~/utils/utils'
import ImageContainer from './ImageContainer'

const STATUS_COLORS = ['#69b34c', '#acb334', '#fab733', '#ff8e15', '#ff0d0d']
const STATUS_TEXT = [
  'Not busy',
  'Somewhat busy',
  'Moderately busy',
  'Almost full',
  'Full',
]

export const StarRatingDisplay = ({ rating, size = 16 }: any) => {
  const starCount = Math.max(Math.round(rating), 1)

  return [...Array(5)].map((_, i) => {
    const isFilled = i < starCount
    return (
      <img
        key={i}
        src={isFilled ? '/star_filled.svg' : '/star_gray.svg'}
        width={size}
        height={size}
      />
    )
  })
}

type Props = {
  display: 'desktop' | 'mobile'
  lotName: string
  color: Color
  rating: number
  reviews: Review[]
  ratingCount: number
}

const StatusDisplay = ({ rating }: any) => {
  const status = Math.max(Math.round(rating), 1) - 1
  const statusText = STATUS_TEXT[status]
  const statusColor = STATUS_COLORS[status]

  return <div className={`text-sm text-[${statusColor}]`}>{statusText}</div>
}

export const Sidebar = forwardRef(
  ({ display, lotName, color, rating, reviews, ratingCount }: Props, ref) => {
    const ratingFormRef = useRef<{ cancelRating: () => void }>(null)
    useImperativeHandle(ref, () => ({
      cancelRating: () => {
        ratingFormRef.current?.cancelRating()
      },
    }))
    return (
      <div className="w-full text-[#202124] font-sans pb-10">
        <img
          className={`object-cover m-0 w-full touch-none pointer-events-none 
          select-none ${display === 'mobile' ? 'h-32' : 'h-48'}`}
          src="/placeholder_lot.jpg"
        />
        <section className="px-6 pb-6 border-b-[1px] border-gray-300">
          <h1 className="pt-4 text-xl">{lotName}</h1>
          <div className="mt-2 flex items-center text-[#70757a] text-sm">
            <span className="">{rating}</span>
            <span className="pl-[6px] pr-[4px] flex">
              <StarRatingDisplay rating={rating} />
            </span>
            <span className="">({ratingCount})</span>
          </div>
          <StatusDisplay rating={rating} />
        </section>
        <RatingForm
          ref={ratingFormRef}
          lotName={kebabCase(lotName)}
          color={color}
        />
        <section className="pt-4 border-b-[1px] border-gray-300">
          <h2 className="font-medium px-6">Images</h2>
          {reviews.length === 0 ? (
            <div className="flex flex-col my-6 px-6 pb-4 justify-center items-center">
              <img src="no_data.svg" className="h-28 w-28 m-4" />
              <p className="text-sm text-gray-500">No images posted yet.</p>
            </div>
          ) : (
            <ImageContainer reviews={reviews} />
          )}
        </section>
      </div>
    )
  }
)

export default Sidebar
