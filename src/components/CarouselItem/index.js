import './index.css'

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Cookies from 'js-cookie'

class CarouselItem extends Component {
  state = {offersList: [], isLoading: true}

  componentDidMount = () => {
    this.getOffersData()
  }

  getOffersData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.offers.map(eachOffer => ({
        id: eachOffer.id,
        imageUrl: eachOffer.image_url,
      }))
      this.setState({offersList: updatedData, isLoading: false})
    }
  }

  renderLoadingView = () => (
    <div
      data-testid="restaurants-offers-loader"
      className="loading-view loader"
    >
      <Loader color="#f7931e" height={60} type="TailSpin" width={60} />
    </div>
  )

  render() {
    const {offersList, isLoading} = this.state
    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 4000,
      autoplaySpeed: 6000,
    }
    return (
      <div>
        {isLoading ? (
          this.renderLoadingView()
        ) : (
          <div>
            <Slider {...settings} className="slide">
              {offersList.map(eachOffer => (
                <li className="slide-container" key={eachOffer.id}>
                  <img className="image" src={eachOffer.imageUrl} alt="offer" />
                </li>
              ))}
            </Slider>
          </div>
        )}
      </div>
    )
  }
}

export default CarouselItem
