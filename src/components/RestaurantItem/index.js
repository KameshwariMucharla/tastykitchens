import './index.css'
import {Link} from 'react-router-dom'

import {GiRoundStar} from 'react-icons/gi'

const RestaurantItem = props => {
  const {restaurantDetails} = props
  const {
    id,
    name,
    restaurantImageUrl,
    rating,
    totalReviews,
    cuisine,
  } = restaurantDetails

  return (
    <Link to={`/restaurant/${id}`} className="link-item">
      <li testid="restaurant-item" className="restaurant-list-item">
        <img
          src={restaurantImageUrl}
          alt="restaurant"
          className="restaurant-img"
        />
        <div>
          <h1 className="restaurant-name">{name}</h1>
          <p className="cuisine">{cuisine}</p>
          <div className="rating-container">
            <GiRoundStar className="rating-star" />
            <p className="rating">
              {rating}
              <span className="reviews"> ({totalReviews} ratings)</span>
            </p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItem
