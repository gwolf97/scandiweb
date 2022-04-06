import React from 'react'
import MiniCart from './MiniCart';
import CurrencySelector from './CurrencySelector';
import Nav from './Nav';
import {useQuery, gql} from '@apollo/client'

const GET_PRODUCTS = gql`
query{
  categories{
    products{
      id
      name
      inStock
      gallery
      description
      category
      prices{
        currency{
          label
          symbol
        }
        amount
      }
      brand
    }
  }
}
`

export default function Data(){
    const {error, data, loading} = useQuery(GET_PRODUCTS);
    const [isHovering, setIsHovering] = React.useState(false)
    const [targetId, setTargetId] = React.useState((""))
    const [cart, setCart] = React.useState([])
    const [cartOpen, setCartOpen] = React.useState(false)
    const [currencySelectorOpen, setCurrencySelectorOpen] = React.useState(true)
    const [currency, setCurrency] = React.useState(1)
    let symbol = cart.length > 0 ? cart[0].prices[currency].currency.symbol : ""
    const total = cart.map(obj => obj.prices[currency].amount).reduce((a,b) => a+b, 0).toFixed(2)

    

    if(loading) return <div>Loading...</div>;
    if(error) return <div>Error</div>;


    function toggleCart(){
      setCartOpen(!cartOpen)
      setCurrencySelectorOpen(false)
    }

    function toggleCurrencySelector(){
      setCurrencySelectorOpen(!currencySelectorOpen)
      setCartOpen(false)
    }

    function changeCurrency(e){
      console.log(e)
      e.target.innerText === "$ USD" && setCurrency(0)
      e.target.innerText === "£ GBP" && setCurrency(1)
      e.target.innerText === "¥ JPY" && setCurrency(3)
    }

    function handleAdd(e) {
      const newItem = data.categories[0].products.filter(obj => obj.gallery[0] === e.target.parentElement.parentNode.childNodes[2].currentSrc)
      setCart(prev => [...prev, newItem[0]])
    }


    function handleSubtract(e) {
      const item = data.categories[0].products.filter(obj => obj.gallery[0] === e.target.parentElement.parentNode.childNodes[2].currentSrc)
      let idx = cart.lastIndexOf(item[0])
      let newCart = [...cart]
      let removed = newCart.splice(idx, 1)
      setCart(newCart)
    }

 


    return(
      <div>
        <Nav selectorOpen={currencySelectorOpen} toggleSelector={toggleCurrencySelector} cart={cart} toggleCart={toggleCart}/>
        {currencySelectorOpen && <CurrencySelector changeCurrency={changeCurrency}/>}
        {cartOpen && <MiniCart currency={currency} total={total} handleAdd={handleAdd} handleSubtract={handleSubtract} cartOpen={cartOpen} symbol={symbol} cart={cart}/>}
        <div onClick={() => {setCartOpen(false) ; setCurrencySelectorOpen(false)}} className={cartOpen ? "fade-in" : ""} style={cartOpen ? {opacity:"0.7", backgroundColor:"rgba(57, 55, 72, 0.22)", height:"2000px"} : {}}>
        <h2 className="category-name">Category name</h2>
        <section className="products-section">
          <div className="product-cards-container">
            {data.categories[0].products.map(product =>{
                return(
                <div onMouseOver={() => {
                  setIsHovering(true) ; setTargetId(product.id)
                }}  key={product.id} className="product-card">
                    {!product.inStock ? <img style={{opacity:"0.4"}} src={product.gallery[0]} className="card-img" alt="" /> : <img src={product.gallery[0]} className="card-img" alt=""/>}
                    {!product.inStock && <div className="out-of-stock">OUT OF STOCK</div>}
                    {isHovering && product.inStock && !cartOpen && targetId === product.id &&  
                    <div className="add-cart-btn" onClick={() => setCart(prev => [...prev, product])}>
                      <img className="add-cart" src="./images/white-cart.png" alt="" />
                    <div className="add-wheels">
                      <img src="./images/white-wheel.png" alt="" />
                      <img src="./images/white-wheel.png" alt="" />
                     </div>
                    </div>}
                    <p className="card-name">{product.name}</p>
                    <p className="card-price">{product.prices[currency].currency.symbol}{product.prices[currency].amount}</p>
                </div>
                )
            })}
          </div>
        </section>
        </div>
        </div>
    )
}