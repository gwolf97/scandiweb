import CartPageProduct from "./CartPageProduct"

const CartPage = (props) => {

   

    let cartWithNoDuplicates = props.cart.reduce(function (previousValue, currentValue) {
        if (previousValue.indexOf(currentValue) === -1) {
            previousValue.push(currentValue)
        }
        return previousValue
        }, [])
       
        let currency = props.currency
        
        const products = cartWithNoDuplicates.map(obj => <CartPageProduct brand={obj.brand} handleAdd={props.handleAdd} handleSubtract={props.handleSubtract} key={obj.name} cart={props.cart} img={obj.gallery[0]} price={obj.prices[currency].amount} symbol={obj.prices[currency].currency.symbol} name={obj.name}/>)

    return ( 
        <section className="cart-page-section">
            <h1>cart page</h1>
            <div className="cart-page">
                {products}
            </div>
        </section>
     );
}
 
export default CartPage;