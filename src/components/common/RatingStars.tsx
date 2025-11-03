import React from 'react'

interface RatingStarsProps {
  rating: number
  maxRating?: number
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating, maxRating = 5 }) => {
  return (
    <div className="text-warning">
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1
        return (
          <i
            key={index}
            className={`bi ${
              starValue <= rating
                ? 'bi-star-fill'
                : starValue <= rating + 0.5
                ? 'bi-star-half'
                : 'bi-star'
            }`}
          />
        )
      })}
      <span className="ms-1 text-muted">({rating})</span>
    </div>
  )
}

export default RatingStars
