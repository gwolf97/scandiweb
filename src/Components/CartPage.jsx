import CartPageProduct from "./CartPageProduct"
import { nanoid } from "nanoid";
import {Component} from "react"

class CartPage extends Component {
  constructor(props) {
    super(props);
  }

  render() { 
     const cartWithNoDuplicates = this.props.cart.reduce(function (previousValue, currentValue) {
      if (previousValue.indexOf(currentValue) === -1) {
        previousValue.push(currentValue);
      }

      return previousValue;
    }, []);
    const currency = this.props.currency;
    const noDuplicates = Array.from(new Set(cartWithNoDuplicates.map(JSON.stringify))).map(JSON.parse);
    const products = noDuplicates.map(obj => <CartPageProduct key={nanoid()} handleSelectedProduct={this.props.handleSelectedProduct} selectedAttributes={obj.selectedAttributes} noDuplicates={noDuplicates} brand={obj.brand} gallery={obj.gallery} handleAdd={this.props.handleAdd} handleSubtract={this.props.handleSubtract} cart={this.props.cart} img={obj.gallery[0]} price={obj.prices[currency].amount} symbol={obj.prices[currency].currency.symbol} name={obj.name} />);
    return (<section className="cart-page-section">
            <h2>CART</h2>
            <div className="cart-page">
                {products}
            </div>
        </section>);
  }

}
 
export default CartPage;