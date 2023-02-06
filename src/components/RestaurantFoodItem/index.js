import './index.css'
import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {GiRoundStar} from 'react-icons/gi'
import CartContext from '../../context/CartContext'

class RestaurantFoodItem extends Component {
  state = {isActive: true, quantity: 1}

  onAddingCart = () => {
    this.setState({isActive: false})
  }

  onDecrementVal = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({
        quantity: prevState.quantity - 1,
      }))
    } else {
      this.setState({isActive: true})
    }
  }

  onIncrementVal = () => {
    const {quantity} = this.state
    if (quantity > 0) {
      this.setState(prevState => ({
        quantity: prevState.quantity + 1,
        isActive: false,
      }))
    }
  }

  render() {
    const {isActive, quantity} = this.state
    const {foodDetails} = this.props

    return (
      <CartContext.Consumer>
        {value => {
          const {onAddCartItem, onDecrement, onIncrement} = value
          const {name, rating, imageUrl, cost, id} = foodDetails

          const onAddingCart = () => {
            this.onAddingCart()
            onAddCartItem({...foodDetails, quantity})
          }

          const onDecrementVal = () => {
            if (quantity > 0) {
              onDecrement(id)
            }

            this.onDecrementVal()
          }

          const onIncrementVal = () => {
            if (quantity > 0) {
              onIncrement(id)
            }

            this.onIncrementVal()
          }

          return (
            <li className="dish-details" testid="foodItem">
              <img className="item-img" src={imageUrl} alt="foodItem" />
              <div>
                <div>
                  <h1 className="dish-name">{name}</h1>
                  <div className="cost-container">
                    <BiRupee className="rupee-icon1" />
                    <p className="dish-cost">{cost}</p>
                  </div>
                  <div className="star-container">
                    <GiRoundStar className="rating-star1" />
                    <p className="dish-rating">{rating}</p>
                  </div>
                </div>
                {isActive ? (
                  <button
                    type="button"
                    className="add-btn"
                    onClick={onAddingCart}
                  >
                    Add
                  </button>
                ) : (
                  <div className="counter-container">
                    <button
                      type="button"
                      className="minus-btn"
                      onClick={onDecrementVal}
                      testid="decrement-count"
                    >
                      -
                    </button>
                    <p className="quantity" testid="active-count">
                      {quantity}
                    </p>
                    <button
                      type="button"
                      className="plus-btn"
                      onClick={onIncrementVal}
                      testid="increment-count"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default RestaurantFoodItem
