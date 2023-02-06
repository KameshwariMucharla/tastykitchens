import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  showCard: false,
  placeOrderClicked: () => {},
  onAddCartItem: () => {},
  onDecrement: () => {},
  onIncrement: () => {},
})

export default CartContext
