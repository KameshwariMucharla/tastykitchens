import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {MdSort} from 'react-icons/md'
import {AiOutlineLeftSquare, AiOutlineRightSquare} from 'react-icons/ai'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'

import RestaurantItem from '../RestaurantItem'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Restaurant extends Component {
  state = {
    restaurantDetails: [],
    activePage: 1,
    sortingOrder: 'Lowest',
    searchInputValue: '',
    isLoading: true,
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  onDecreasePageNo = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({activePage: prevState.activePage - 1}),
        this.getRestaurantDetails,
      )
    }
  }

  onIncreasePageNo = () => {
    const {activePage} = this.state
    if (activePage < 4) {
      this.setState(
        prevState => ({activePage: prevState.activePage + 1}),
        this.getRestaurantDetails,
      )
    }
  }

  searchInputValueChanged = event => {
    this.setState(
      {searchInputValue: event.target.value},
      this.getRestaurantDetails,
    )
  }

  getRestaurantDetails = async () => {
    const {activePage, sortingOrder, searchInputValue} = this.state
    const offset = (activePage - 1) * 9
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=9&sort_by_rating=${sortingOrder}&search=${searchInputValue}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.restaurants.map(eachData => ({
        restaurantImageUrl: eachData.image_url,
        name: eachData.name,
        id: eachData.id,
        cuisine: eachData.cuisine,
        rating: eachData.user_rating.rating,
        totalReviews: eachData.user_rating.total_reviews,
      }))
      this.setState({restaurantDetails: [...updatedData], isLoading: false})
    }
  }

  orderChanged = event => {
    this.setState({sortingOrder: event.target.value}, this.getRestaurantDetails)
  }

  renderLoadingView = () => (
    <div className="loading-view loader" testid="restaurants-list-loader">
      <Loader color="#f7931e" height={70} type="TailSpin" width={70} />
    </div>
  )

  render() {
    const {restaurantDetails, activePage, isLoading, sortingOrder} = this.state
    return (
      <div>
        {isLoading ? (
          this.renderLoadingView()
        ) : (
          <div className="restaurant-details">
            <h1 className="popular-heading">Popular Restaurants</h1>

            <div className="restaurant-top-section">
              <p className="description">
                Select Your favourite restaurant special dish and make your day
                happy...
              </p>

              <div className="sorting-container">
                <MdSort className="sort-icon" />
                <p className="sort-heading">Sort by </p>
                <select
                  className="select"
                  onChange={this.orderChanged}
                  value={sortingOrder}
                >
                  {sortByOptions.map(eachOption => (
                    <option
                      className="options"
                      key={eachOption.id}
                      value={eachOption.value}
                    >
                      {eachOption.displayText}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="search-container">
              <input
                type="search"
                className="search-input"
                onChange={this.searchInputValueChanged}
              />
              <BsSearch className="search-icon" />
            </div>
            <hr className="separator" />

            {isLoading ? (
              this.renderLoadingView()
            ) : (
              <div className="restaurant-list-container">
                {restaurantDetails.map(eachRestaurant => (
                  <RestaurantItem
                    restaurantDetails={eachRestaurant}
                    key={eachRestaurant.id}
                  />
                ))}
              </div>
            )}
            <div className="pagination-container">
              <button
                type="button"
                className="pagination-btn"
                onClick={this.onDecreasePageNo}
                testid="pagination-left-button"
              >
                <AiOutlineLeftSquare className="arrow-icon" />
              </button>
              <p className="page-no" testid="active-page-number">
                {activePage} of 4
              </p>
              <button
                type="button"
                className="pagination-btn"
                testid="pagination-right-button"
                onClick={this.onIncreasePageNo}
              >
                <AiOutlineRightSquare className="arrow-icon" />
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Restaurant
