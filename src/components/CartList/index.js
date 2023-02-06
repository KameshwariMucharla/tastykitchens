import './index.css'
import {BiRupee} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import CartContext from '../../context/CartContext'
import CartItem from '../CartItem'

const CartList = () => (
  <CartContext.Consumer>
    {value => {
      const {placeOrderClicked} = value
      const cartListItem = localStorage.getItem('cartData')
      const cartList = JSON.parse(cartListItem)
      const totalAmountList = cartList.map(
        eachItem => eachItem.cost * eachItem.quantity,
      )

      const totalAmount = totalAmountList.reduce((acc, item) => acc + item)

      return (
        <div className="cart-list-outer-container">
          <div className="cart-list-container">
            <p className="text-item">Item</p>
            <p className="text-item">Quantity</p>
            <p className="text-item">Price</p>
          </div>
          {cartList.map(eachCart => (
            <CartItem cartDetails={eachCart} key={eachCart.id} />
          ))}
          <hr className="line-break" />
          <div className="order-container">
            <h1 className="order-heading">Order Total: </h1>
            <div className="amount-container">
              <div className="total-amount-container">
                <BiRupee className="bi-rupee" />
                <p className="amount">{totalAmount}</p>
              </div>
              <Link to="/payment">
                <button
                  type="button"
                  className="place-order-btn"
                  onClick={placeOrderClicked}
                >
                  Place Order
                </button>
              </Link>
            </div>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartList
