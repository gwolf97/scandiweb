import { printIntrospectionSchema } from "graphql";
import React, { useEffect, useState } from "react";

const ProductPage = (props) => {
    const [mainImg, setMainImg] = React.useState(props.selectedProduct[0].gallery[0])
    
    useEffect(() => {
        setMainImg(props.selectedProduct[0].gallery[0])
    }, [props.selectedProduct])

    const currency = props.currency
    const galleryImages = props.selectedProduct[0].gallery.map(src => <div className="gallery-img-container" key={src}><img onClick={() => setMainImg(src)} src={src}/></div>)

    let attOne = props.selectedAttributes.length >= 1 ? props.selectedAttributes[0] : {attribute: "", id:""}
    let attTwo = props.selectedAttributes.length >= 2 ? props.selectedAttributes[1] : {attribute: "", id:""}
    let attThree = props.selectedAttributes.length >= 3 ? props.selectedAttributes[2] : {attribute: "", id:""}
    let attFour = props.selectedAttributes.length >= 4 ? props.selectedAttributes[3] : {attribute: "", id:""}

    const attributes = props.selectedProduct[0].attributes.length > 0 ? props.selectedProduct[0].attributes.map(attribute => <div key={attribute.name}><p className="product-sub-title product-size-label">{attribute.name.toUpperCase()}</p>  <div className="mini-sizes sizes">{attribute.items.map(item => <div onClick={props.handleSelectedAttribute} className={attOne.attribute === item.displayValue && attOne.id === attribute.id || attTwo.attribute === item.displayValue && attTwo.id === attribute.id || attThree.attribute === item.displayValue && attThree.id === attribute.id || attFour.attribute === item.displayValue && attFour.id === attribute.id  ? "mini-size dark" : "mini-size size"} id={attribute.id} key={attribute.id + "" + item.id}>{item.displayValue}</div>)} </div> </div>) : <div></div> 

        

    function removeTags(str) {
        if ((str===null) || (str===''))
            return false;
        else
            str = str.toString();
        return str.replace( /(<([^>]+)>)/ig, '');
    }

    return ( 
        <section className="product-page-section">
            <div className="product-page-container">
                <div className="product-gallery">{galleryImages}</div>
                <div><img className="main-img" src={mainImg} alt="" /></div>
                <div className="product-description">
                    <div className="product-title">
                        <h3 className="product-brand">{props.selectedProduct[0].brand}</h3><br />
                        <h3 className="product-name">{props.selectedProduct[0].name}</h3>
                    </div> 
                    <div className="product-size-price">
                       {attributes}
                        <p className="product-sub-title">PRICE:</p>
                        <p className="product-price">{props.selectedProduct[0].prices[currency].currency.symbol}{props.selectedProduct[0].prices[currency].amount}</p>
                    </div> 
                    <button onClick={props.productPageAddCart} className="product-page-add-button">ADD TO CART</button>
                    <p className="product-page-description">{removeTags(props.selectedProduct[0].description)}</p>
                </div>
            </div>
        </section>
     );
}
 
export default ProductPage;