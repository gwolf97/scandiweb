import { nanoid } from "nanoid";
import {Component} from "react"

class CartPageProduct extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const amount = this.props.cart.filter(x => JSON.stringify(x.selectedAttributes) === JSON.stringify(this.props.selectedAttributes) && x.name === this.props.name).length;
    const images = this.props.gallery.map(obj => <img key={amount + this.props.name + obj + this.props.selectedAttributes} src={obj} />);
    const attributeSquares = this.props.selectedAttributes.map(obj => obj !== "" && <div key={nanoid()} className={obj.attribute === "No" ? "hide" : "mini-size size product-att dark"}>{obj.attribute === "Yes" ? `${obj.id === 'Touch ID in keyboard' ? "Touch ID" : "USB x 3"}` : obj.attribute} </div>);
    const brand = this.props.brand
    const name = this.props.name
    const price = `${this.props.symbol}${this.props.price.toFixed(2)}`

    return (<div key={nanoid()} className="mini-product product">
        <div className="mini-description description">
            <div className="mini-details details">
                <p className="mini-brand brand">{brand}</p>
                <p onClick={this.props.handleSelectedProduct} className="mini-name name hover">{name}</p>
                <p className="mini-price price">{price}</p>
            </div>
            <div className="mini-sizes sizes product-att-container">
                <div className="sizes-scroll">
               {attributeSquares}
               </div>
            </div>
        </div>
        <div className="mini-controls product-controls">
            <div onClick={this.props.handleAdd} className="mini-add add">+</div>
            <p className="mini-amount">{amount}</p>
            <div onClick={this.props.handleSubtract} className="mini-subtract subtract">-</div>
        </div>
        <div className="gallery">
            <img onClick={e => e.target.parentElement.scrollBy(-100, 0)} src="./images/gallery-left.png" alt="" className="gallery-left" />
                {images}
             <img onClick={e => e.target.parentElement.scrollBy(100, 0)} src="./images/gallery-left.png" alt="" className="gallery-right" />
        </div>
    </div>);
  }

}
 
export default CartPageProduct;