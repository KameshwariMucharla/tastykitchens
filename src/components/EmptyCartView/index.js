import './index.css'
import {Link} from 'react-router-dom'

const EmptyCartView = () => (
  <div className="empty-cart-container">
    <img
      src="https://res.cloudinary.com/dfgc7y56h/image/upload/v1674715243/Layer_2_hksyrk.png"
      alt="empty cart"
      className="empty-cart"
    />
    <h1 className="empty-cart-heading">No Order Yet!</h1>
    <p className="empty-cart-description">
      Your cart is empty. Add something from the menu.
    </p>
    <Link to="/">
      <button type="button" className="order-now-btn">
        Order Now
      </button>
    </Link>
  </div>
)

export default EmptyCartView
