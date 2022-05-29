import React from "react";
import { Component } from "react";

export class ProductGalleryPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<section style={this.props.showCartPage || this.props.showProductPage ? {
      display: "none"
    } : {}} className="products-section">
          <div className="product-cards-container">
            {this.props.data.categories[0].products.filter(obj => obj.category === this.props.category.category1 || obj.category === this.props.category.category2).map(product => {
          return <div onMouseOver={() => {
            this.props.setIsHovering(true);
            this.props.setTargetId(product.id);
          }} key={product.id} className="product-card">
                    {!product.inStock ? <div className="card-img-container"><img style={{
                opacity: "0.4"
              }} src={product.gallery[0]} className="card-img" alt="" /> </div> : <img src={product.gallery[0]} className="card-img" alt="" />}
                    {!product.inStock && <div className="out-of-stock">OUT OF STOCK</div>}
                    {this.props.isHovering && product.inStock && !this.props.cartOpen && this.props.targetId === product.id && <div className="add-cart-btn" onClick={() => this.props.handleGreenCart(product)}>
                      <img className="add-cart" src="./images/white-cart.png" alt="" />
                    <div className="add-wheels">
                      <img src="./images/white-wheel.png" alt="" />
                      <img src="./images/white-wheel.png" alt="" />
                     </div>
                    </div>}
                    <p onClick={product.inStock ? this.props.handleSelectedProduct : null} className={product.inStock ? "card-name hover" : "card-name"}>{product.brand} {product.name}</p>
                    <p className="card-price">{product.prices[this.props.currency].currency.symbol}{product.prices[this.props.currency].amount.toFixed(2)}</p>
                </div>;
        })}
          </div>
        </section>);
  }

}
  
