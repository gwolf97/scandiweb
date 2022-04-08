const CartPageProduct = (props) => {

        const data = props.cart.map(obj => obj.name)
        
        const amountOfItems = data.reduce(function(obj, name) {
            if (!obj[name]) {
                    obj[name] = 0;
            }
            obj[name]++;
            return obj;
          }, {});
        
          const amount = amountOfItems[props.name]


    const images = props.gallery.map(obj => <img src={obj}/>)

    return ( 
        <div className="mini-product product">
        <div className="mini-description description">
            <div className="mini-details details">
                <p className="mini-brand brand">{props.brand}</p>
                <p className="mini-name name">{props.name}</p>
                <p className="mini-price price">{props.symbol}{props.price}</p>
            </div>
            <div className="mini-sizes sizes">
                <div className="mini-size size">S</div>
                <div className="mini-size size dark">M</div>
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