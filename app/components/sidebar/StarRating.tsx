// StarRating.tsx
import React, { useState, useEffect, useImperativeHandle } from 'react'

interface StarRatingProps {
  size?: number
  rating: number | null
  setRating: (rating: number | null) => void
}

const StarRating: React.FC<StarRatingProps> = ({
  setRating,
  rating,
  size = 24,
}) => {
  const handleClick = (index: number) => {
    // If the clicked star is already selected, reset the rating to 0
    const newRating = index === rating ? null : index
    setRating(newRating)
  }

  return (
    <div className="flex py-1">
      {[...Array(5)].map((_, index) => {
        const starIndex = index + 1
        const isFilled = starIndex <= (rating || 0)

        return (
          <img
            key={starIndex}
            onClick={() => handleClick(starIndex)}
            src={isFilled ? '/star_filled.svg' : '/star_unfilled.svg'}
            width={size}
            height={size}
            className="cursor-pointer pe-1"
          />
        )
      })}
    </div>
  )
}

export default StarRating
