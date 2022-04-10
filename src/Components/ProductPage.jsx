import { printIntrospectionSchema } from "graphql";
import React from "react";

const ProductPage = (props) => {
    const [mainImg, setMainImg] = React.useState(props.selectedProduct[0].gallery[0])
    
    const currency = props.currency
    const galleryImages = props.selectedProduct[0].gallery.map(src => <img onClick={() => setMainImg(src)} src={src}/>)

    let attributes = props.selectedProduct[0].attributes.length > 0 ? props.selectedProduct[0].attributes[0].items.map(attribute => <div className="mini-size size" key={attribute.id}>{attribute.displayValue}</div>) : <div></div>

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
                <div className="product-gallery"><h1>{galleryImages}</h1></div>
                <div ><img className="main-img" src={mainImg} alt="" /></div>
                <div className="product-description">
                    <div className="product-title">
                        <h3 className="product-brand">{props.selectedProduct[0].brand}</h3><br />
                        <h3 className="product-name">{props.selectedProduct[0].name}</h3>
                    </div> 
                    <div className="product-size-price">
                        <p className="product-sub-title product-size-label">{props.selectedProduct[0].attributes.length > 0 ? `${props.selectedProduct[0].attributes[0].name.toUpperCase()}:` : ""}</p>
                        <div className="mini-sizes sizes">
                           {attributes}
                        </div>
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