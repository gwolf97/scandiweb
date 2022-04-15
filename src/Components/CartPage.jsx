import CartPageProduct from "./CartPageProduct"

const CartPage = (props) => {

    let cartWithNoDuplicates = props.cart.reduce(function (previousValue, currentValue) {
        if (previousValue.indexOf(currentValue) === -1) {
            previousValue.push(currentValue)
        }
        return previousValue
        }, [])
       
        let currency = props.currency
        
        let noDuplicates = Array.from(new Set(cartWithNoDuplicates.map(JSON.stringify))).map(JSON.parse);

        const products = noDuplicates.map(obj => <CartPageProduct key={obj} selectedAttributes={obj.selectedAttributes} noDuplicates={noDuplicates} brand={obj.brand} gallery={obj.gallery} handleAdd={props.handleAdd} handleSubtract={props.handleSubtract} cart={props.cart} img={obj.gallery[0]} price={obj.prices[currency].amount} symbol={obj.prices[currency].currency.symbol} name={obj.name}/>)


    return ( 
        <section className="cart-page-section">
            <h2>CART</h2>
            <div className="cart-page">
                {products}
            </div>
        </section>
     );
}
 
export default CartPage;