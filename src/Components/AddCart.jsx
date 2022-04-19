import {Component} from "react"

class AddCart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className="add-cart-btn" onClick={this.props.handleAdd}>
        <img className="add-cart" src="./images/white-cart.png" alt="" />
        <div className="add-wheels">
          <img src="./images/white-wheel.png" alt="" />
          <img src="./images/white-wheel.png" alt="" />
        </div>
      </div>);
  }

}
 
export default AddCart;