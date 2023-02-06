import './index.css'

import Header from '../Header'
import EmptyCartView from '../EmptyCartView'
import CartList from '../CartList'

const Cart = () => {
  const cartListItem = localStorage.getItem('cartData')
  const cartList = JSON.parse(cartListItem)
  const itemsInCart = cartList.length
  return (
    <div>
      <Header activeTab="CART" />

      <div>{itemsInCart === 0 ? <EmptyCartView /> : <CartList />} </div>
    </div>
  )
}

export default Cart
