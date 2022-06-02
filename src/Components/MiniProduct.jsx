import React from "react"
import { nanoid } from "nanoid"
import { Component } from "react"



class MiniProduct extends Component {
  constructor(props) {
    super(props);
  }

  

  render() {
    console.log(this.props.cart)
    let amount = this.props.cart.filter(x => JSON.stringify(x.selectedAttributes) === JSON.stringify(this.props.selectedAttributes) && x.name === this.props.name).length;
    let attributeMiniSquares = this.props.selectedAttributes.map(obj => obj !== "" && <div key={nanoid()} className={obj.attribute === "No" ? "hide" : "mini-size"}>{obj.attribute === "Yes" ? `${obj.id === 'Touch ID in keyboard' ? "Touch ID" : "USB x 3"}` : obj.attribute} </div>);
    return (<div className="mini-product" key={nanoid()}>
            <div className="mini-description">
                <div className="mini-details">
                    <p className="mini-brand">{this.props.brand}</p>
                    <p onClick={this.props.handleSelectedProduct} className="mini-name hover">{this.props.name}</p>
                    <p className="mini-price">{this.props.symbol}{this.props.price.toFixed(2)}</p>
                </div>
                <div className="mini-sizes">
                    <div className="sizes-scroll">
                    {attributeMiniSquares}
                    </div>
                </div>
            </div>
            <div className="mini-controls">
                <div onClick={this.props.handleAdd} className="mini-add">+</div>
                <p className="mini-amount">{amount}</p>
                <div onClick={this.props.handleSubtract} className="mini-subtract">-</div>
            </div>
            <div className="mini-product-img-container">
            <img className="mini-product-img" src={this.props.img} alt="" />
            </div>
        </div>);
  }

}
 
export default MiniProduct;