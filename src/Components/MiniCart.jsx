import MiniProduct from "./MiniProduct";

const MiniCart = (props) => {

    const miniProducts = props.cart.map(obj => <MiniProduct img={obj.gallery[0]} price={obj.prices[0].amount} symbol={obj.prices[0].currency.symbol} name={obj.name}/>)

    return ( 
        <div className="mini-cart slide-in">
            {props.cart.length === 0 ? <h3 style={{margin:"220px 0 0 90px"}}>No items in cart</h3> : <h3><span>My Bag.</span> {props.cart.length} item{props.cart.length !== 1 && "s"}</h3>}
            <div className="mini-products">
                {miniProducts}
            </div>
            {props.cart.length > 0 && 
            <div>
                <div className="mini-total">
                    <p>Total</p><p><span>{props.symbol}100.00</span></p>
                </div>
                <div className="mini-btns">
                    <button className="view-bag">VIEW BAG</button>
                    <button className="check-out">CHECK OUT</button>
                </div>
            </div>
            }
        </div> 
     );
}
 
export default MiniCart;