const MiniProduct = (props) => {
    return ( 
        <div className="mini-product">
            <div className="mini-description">
                <div className="mini-details">
                    <p className="mini-name">{props.name}</p>
                    <p className="mini-price">{props.symbol}{props.price}</p>
                </div>
                <div className="mini-sizes">
                    <div className="mini-size">S</div>
                    <div className="mini-size unavailable">M</div>
                </div>
            </div>
            <div className="mini-controls">
                <div className="mini-add">+</div>
                <p className="mini-amount">1</p>
                <div className="mini-subtract">-</div>
            </div>
            <img src={props.img} alt="" />
        </div>
     );
}
 
export default MiniProduct;