import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'
import RestaurantFoodItem from '../RestaurantFoodItem'
import RestaurantBannerSection from '../RestaurantBannerSection'

class RestaurantDetails extends Component {
  state = {foodItemsList: [], restaurantDetailsList: {}, isLoading: true}

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok) {
      console.log(data)
      const updatedData = {
        id: data.id,
        costOfTwo: data.cost_for_two,
        imageUrl: data.image_url,
        rating: data.rating,
        cuisine: data.cuisine,
        reviewsCount: data.reviews_count,
        location: data.location,
        name: data.name,
      }
      const foodListData = data.food_items.map(eachItem => ({
        cost: eachItem.cost,
        foodType: eachItem.food_type,
        id: eachItem.id,
        name: eachItem.name,
        rating: eachItem.rating,
        imageUrl: eachItem.image_url,
      }))
      this.setState({
        restaurantDetailsList: updatedData,
        foodItemsList: foodListData,
        isLoading: false,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loading-view loader" testid="restaurant-details-loader">
      <Loader color="#f7931e" height={70} type="TailSpin" width={70} />
    </div>
  )

  render() {
    const {restaurantDetailsList, foodItemsList, isLoading} = this.state
    return (
      <div className="restaurant-outer-container">
        <Header />
        <div className="restaurant-top-section1">
          {isLoading ? (
            this.renderLoadingView()
          ) : (
            <RestaurantBannerSection
              restaurantDetailsList={restaurantDetailsList}
            />
          )}
        </div>
        {isLoading ? (
          this.renderLoadingView()
        ) : (
          <ul className="food-list-container">
            {foodItemsList.map(eachFoodItem => (
              <RestaurantFoodItem
                foodDetails={eachFoodItem}
                key={eachFoodItem.id}
              />
            ))}
          </ul>
        )}

        <Footer />
      </div>
    )
  }
}

export default RestaurantDetails
