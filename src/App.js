import './App.css'
import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import RestaurantDetails from './components/RestaurantDetails'
import OrderSuccessCard from './components/OrderSuccessCard'
import CartContext from './context/CartContext'

const getItemsInCartList = () => {
  const cartListItems = localStorage.getItem('cartData')

  if (cartListItems === null) {
    return []
  }
  return JSON.parse(cartListItems)
}

class App extends Component {
  state = {cartList: getItemsInCartList(), showCard: false}

  onAddCartItem = dish => {
    const {cartList} = this.state
    const cartObject = cartList.find(
      eachCartItem => eachCartItem.id === dish.id,
    )
    if (cartObject) {
      console.log(dish)
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCart => {
          if (eachCart.id === dish.id) {
            return {...eachCart, quantity: eachCart.quantity + dish.quantity}
          }
          return eachCart
        }),
      }))
    } else {
      const updatedCartList = [...cartList, dish]

      this.setState({cartList: updatedCartList})
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.id !== id,
    )

    this.setState({cartList: updatedCartList})
  }

  onDecrement = id => {
    const {cartList} = this.state

    const cartObject = cartList.find(eachCartItem => eachCartItem.id === id)
    if (cartObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCart => {
          if (eachCart.id === id) {
            return {...eachCart, quantity: eachCart.quantity - 1}
          }
          return eachCart
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  onIncrement = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCart => {
        if (eachCart.id === id) {
          return {...eachCart, quantity: eachCart.quantity + 1}
        }
        return eachCart
      }),
    }))
  }

  placeOrderClicked = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList, showCard} = this.state

    localStorage.setItem('cartData', JSON.stringify(cartList))

    return (
      <CartContext.Provider
        value={{
          onAddCartItem: this.onAddCartItem,
          showCard,
          cartList,
          onDecrement: this.onDecrement,
          onIncrement: this.onIncrement,
          placeOrderClicked: this.placeOrderClicked,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={RestaurantDetails}
          />
          <ProtectedRoute exact path="/payment" component={OrderSuccessCard} />

          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
