import './index.css'

import {BiRupee} from 'react-icons/bi'
import {GiRoundStar} from 'react-icons/gi'

const RestaurantBannerSection = props => {
  const {restaurantDetailsList} = props
  return (
    <>
      <img
        src={restaurantDetailsList.imageUrl}
        alt="restaurant"
        className="restaurant-image"
      />
      <div className="details-container">
        <h1 className="name">{restaurantDetailsList.name}</h1>
        <p className="cuisine1">{restaurantDetailsList.cuisine}</p>
        <p className="location">{restaurantDetailsList.location}</p>

        <div className="rating-details-container">
          <div className="star-rating-container">
            <div className="star-container">
              <GiRoundStar className="star-icon" />
              <p className="stars">{restaurantDetailsList.rating}</p>
            </div>

            <p className="ratings">
              {restaurantDetailsList.reviewsCount}+ Ratings
            </p>
          </div>
          <hr />
          <div className="cost-outer-container">
            <div className="cost-container">
              <BiRupee className="rupee-icon" />
              <p className="rupee">{restaurantDetailsList.costOfTwo}</p>
            </div>
            <p className="ratings">Cost for two</p>
          </div>
        </div>
      </div>
    </>
  )
}
export default RestaurantBannerSection
