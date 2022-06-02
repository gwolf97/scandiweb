import { nanoid } from "nanoid";
import MiniProduct from "./MiniProduct";
import {Component} from "react"

class MiniCart extends Component {
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
    const miniProducts = noDuplicates.map(obj => <MiniProduct handleSelectedProduct={this.props.handleSelectedProduct} key={nanoid()} selectedAttributes={obj.selectedAttributes} brand={obj.brand} handleAdd={this.props.handleAdd} handleSubtract={this.props.handleSubtract} cart={this.props.cart} img={obj.gallery[0]} price={obj.prices[currency].amount} symbol={obj.prices[currency].currency.symbol} name={obj.name} />);
    return (<div className="mini-cart slide-in">
            {this.props.cart.length === 0 ? <h3 style={{
        margin: "220px 0 0 90px"
      }}>No items in cart</h3> : <h3><span>My Bag.</span> {this.props.cart.length} item{this.props.cart.length !== 1 && "s"}</h3>}
            <div className="mini-products">
                {miniProducts}
            </div>
            {this.props.cart.length > 0 && <div>
                <div className="mini-total">
                    <p>Total</p><p><span>{this.props.symbol}{this.props.total}</span></p>
                </div>
                <div className="mini-btns">
                    <button onClick={this.props.viewCartPage} className="view-bag">VIEW BAG</button>
                    <button className="check-out">CHECK OUT</button>
                </div>
            </div>}
        </div>);
  }

}
 
export default MiniCart;