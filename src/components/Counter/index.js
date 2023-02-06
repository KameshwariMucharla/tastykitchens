import {Component} from 'react'

import './index.css'

class Counter extends Component {
  render() {
    const {quantityOfFood} = this.props

    return (
      <div className="counter-container">
        <button type="button" className="minus-btn">
          -
        </button>
        <p className="quantity">{quantityOfFood}</p>
        <button type="button" className="plus-btn">
          +
        </button>
      </div>
    )
  }
}

export default Counter
