import './index.css'
import {BiRupee} from 'react-icons/bi'

import CartContext from '../../context/CartContext'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {onIncrement, onDecrement} = value
      const {cartDetails} = props

      const {imageUrl, cost, quantity, name, id} = cartDetails
      const onIncrementVal = () => {
        if (quantity > 0) {
          onIncrement(id)
        }
      }

      const onDecrementVal = () => {
        if (quantity > 0) {
          onDecrement(id)
        }
      }

      return (
        <li className="cart-list-container1" testid="cartItem">
          <div className="cart-container">
            <img src={imageUrl} alt={name} className="cart-img" />
            <h1 className="cart-dish-name">{name}</h1>
          </div>
          <div className="quantity-price-container">
            <h1 className="cart-dish-name1">{name}</h1>
            <div className="counter-container1">
              <button
                type="button"
                className="minus-btn"
                onClick={onDecrementVal}
                testid="decrement-quantity"
              >
                -
              </button>
              <p className="quantity" testid="item-quantity">
                {quantity}
              </p>
              <button
                type="button"
                className="plus-btn"
                onClick={onIncrementVal}
                testid="increment-quantity"
              >
                +
              </button>
            </div>
            <div className="total-cost-container">
              <BiRupee className="rupee-icon2" />
              <p className="total-cost" testid="total-price">
                {cost * quantity}
              </p>
            </div>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)
export default CartItem
