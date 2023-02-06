import './index.css'
import {Link} from 'react-router-dom'
import {AiFillCheckCircle} from 'react-icons/ai'
import CartContext from '../../context/CartContext'

const OrderSuccessCard = () => (
  <CartContext.Consumer>
    {value => {
      const {onVisitHomePage} = value

      return (
        <div className="order-placed-container">
          <AiFillCheckCircle className="check-icon" />
          <h1 className="payment-heading">Payment Successful</h1>
          <p className="greetings">
            Thank you for ordering <br />
            Your payment is successfully completed.
          </p>
          <Link to="/">
            <button
              type="button"
              className="go-to-home-page-btn"
              onClick={onVisitHomePage}
            >
              {' '}
              Go To Home Page
            </button>
          </Link>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default OrderSuccessCard
