const CartPageProduct = (props) => {

    let amount = props.cart.filter(x => JSON.stringify(x.selectedAttributes) === JSON.stringify(props.selectedAttributes)).length

    const images = props.gallery.map(obj => <img key={amount + props.name + obj + props.selectedAttributes}  src={obj}/>)

    let attributeSquares = props.selectedAttributes.map(obj => obj !== "" && <div  key={amount + props.name + props.selectedAttributes + props.brand} className={obj.attribute === "No" ? "hide" : "mini-size size product-att dark"}>{obj.attribute === "Yes" ? `${obj.id === 'Touch ID in keyboard' ? "Touch ID" : "USB x 3"}` : obj.attribute} </div>)

    return ( 
        <div key={amount + props.name + props.selectedAttributes} className="mini-product product">
        <div className="mini-description description">
            <div className="mini-details details">
                <p className="mini-brand brand">{props.brand}</p>
                <p className="mini-name name">{props.name}</p>
                <p className="mini-price price">{props.symbol}{props.price}</p>
            </div>
            <div className="mini-sizes sizes product-att-container">
                <div className="sizes-scroll">
               {attributeSquares}
               </div>
            </div>
        </div>
        <div className="mini-controls product-controls">
            <div onClick={props.handleAdd} className="mini-add add">+</div>
            <p className="mini-amount">{amount}</p>
            <div onClick={props.handleSubtract} className="mini-subtract subtract">-</div>
        </div>
        <div className="gallery">
            <img onClick={(e) => e.target.parentElement.scrollBy(-100,0)} src="./images/gallery-left.png" alt="" className="gallery-left"/>
                {images}
             <img onClick={(e) => e.target.parentElement.scrollBy(100, 0)} src="./images/gallery-left.png" alt="" className="gallery-right"/>
        </div>
    </div>
     );
}
 
export default CartPageProduct;