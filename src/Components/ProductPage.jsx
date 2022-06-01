import { printIntrospectionSchema } from "graphql";
import React, { useEffect, useState } from "react";
import {Component} from "react"

//Sets main image to first img of selected product gallery when using functional components
//useEffect(() => {
//    setMainImg(props.selectedProduct[0].gallery[0])
//}, [props.selectedProduct])


class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainImg: this.props.selectedProduct[0].gallery[0],
    }
  };

  handleButtonClick(src){
    this.setMainImg({mainImg: `${src}`})
  }

  render() {
    const currency = this.props.currency;
    const galleryImages = this.props.selectedProduct[0].gallery.map(src => <div className="gallery-img-container" key={src}><img src={src} onClick={() =>{this.handleButtonClick(src)}}  /></div>);
    let attOne = this.props.selectedAttributes.length >= 1 ? this.props.selectedAttributes[0] : {
      attribute: "",
      id: ""
    };
    let attTwo = this.props.selectedAttributes.length >= 2 ? this.props.selectedAttributes[1] : {
      attribute: "",
      id: ""
    };
    let attThree = this.props.selectedAttributes.length >= 3 ? this.props.selectedAttributes[2] : {
      attribute: "",
      id: ""
    };
    let attFour = this.props.selectedAttributes.length >= 4 ? this.props.selectedAttributes[3] : {
      attribute: "",
      id: ""
    };
    const attributes = this.props.selectedProduct[0].attributes.length > 0 ? this.props.selectedProduct[0].attributes.map(attribute => <div key={attribute.name}><p className="product-sub-title product-size-label">{attribute.name.toUpperCase()}</p>  <div className="mini-sizes sizes">{attribute.items.map(item => <div onClick={this.props.handleSelectedAttribute} className={attOne.attribute === item.displayValue && attOne.id === attribute.id || attTwo.attribute === item.displayValue && attTwo.id === attribute.id || attThree.attribute === item.displayValue && attThree.id === attribute.id || attFour.attribute === item.displayValue && attFour.id === attribute.id ? "mini-size size dark selected" : "mini-size size"} style={item.value.includes("#") ? {backgroundColor: item.value, color:item.value} : {}} id={attribute.id} key={attribute.id + "" + item.id}>{item.displayValue}</div>)} </div> </div>) : <div></div>;

    function removeTags(str) {
      if (str === null || str === '') return false;else str = str.toString();
      return str.replace(/(<([^>]+)>)/ig, '');
    }

    return (<section className="product-page-section">
            <div className="product-page-container">
                <div className="product-gallery">{galleryImages}</div>
                <div><img className="main-img" src={this.state.mainImg} alt="" /></div>
                <div className="product-description">
                    <div className="product-title">
                        <h3 className="product-brand">{this.props.selectedProduct[0].brand}</h3><br />
                        <h3 className="product-name">{this.props.selectedProduct[0].name}</h3>
                    </div> 
                    <div className="product-size-price">
                       {attributes}
                        <p className="product-sub-title">PRICE:</p>
                        <p className="product-price">{this.props.selectedProduct[0].prices[currency].currency.symbol}{this.props.selectedProduct[0].prices[currency].amount.toFixed(2)}</p>
                    </div> 
                    <button onClick={this.props.productPageAddCart} className="product-page-add-button">ADD TO CART</button>
                    <p className="product-page-description">{removeTags(this.props.selectedProduct[0].description)}</p>
                </div>
            </div>
        </section>);
  }

}
 
export default ProductPage;