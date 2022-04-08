import React from 'react'
import MiniCart from './MiniCart';
import CurrencySelector from './CurrencySelector';
import Nav from './Nav';
import CartPage from './CartPage';
import ProductPage from './ProductPage'
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
    const [selectedProduct, setSelectedProduct] = React.useState([])
    const [showProductPage, setShowProductPage] = React.useState(false)
    const [categoryName, setCategoryName] = React.useState("All Products")
    const [cart, setCart] = React.useState([])
    const [cartOpen, setCartOpen] = React.useState(false)
    const [showCartPage, setShowCartPage] = React.useState(false)
    const [currencySelectorOpen, setCurrencySelectorOpen] = React.useState(false)
    const [currency, setCurrency] = React.useState(0)
    const [category,setCategory] = React.useState({
      category1:"tech",
      category2:"clothes"
    })
    let symbol = cart.length > 0 ? cart[0].prices[currency].currency.symbol : ""
    const total = cart.map(obj => obj.prices[currency].amount).reduce((a,b) => a+b, 0).toFixed(2)   

    if(loading) return <div>Loading...</div>;
    if(error) return <div>Error</div>;

    function categoryNav(e){
      e.target.innerText === "ALL" && setCategory({ category1:"tech",category2:"clothes"}) ; setCategoryName("All Products")
      e.target.innerText === "TECH" && setCategory({ category1:"tech",category2:""}) ; setCategoryName("Tech")
      e.target.innerText === "CLOTHES" && setCategory({ category1:"clothes",category2:""}) ; setCategoryName("Clothes")
      e.target.innerText === "ALL" && setCategoryName("All Products")
      e.target.innerText === "TECH" && setCategoryName("Tech")
      e.target.innerText === "CLOTHES" && setCategoryName("Clothes")
      setShowCartPage(false)
      setShowProductPage(false)
      setSelectedProduct([])
    }


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

    function handleBagAdd(e) {
      const newItem = data.categories[0].products.filter(obj => obj.gallery[0] === e.target.parentElement.parentNode.childNodes[2].childNodes[1].currentSrc)
      setCart(prev => [...prev, newItem[0]])
    }


    function handleSubtract(e) {
      const item = data.categories[0].products.filter(obj => obj.gallery[0] === e.target.parentElement.parentNode.childNodes[2].currentSrc)
      let idx = cart.lastIndexOf(item[0])
      let newCart = [...cart]
      let removed = newCart.splice(idx, 1)
      setCart(newCart)
    }

    function handleBagSubtract(e) {
      const item = data.categories[0].products.filter(obj => obj.gallery[0] === e.target.parentElement.parentNode.childNodes[2].childNodes[1].currentSrc)
      let idx = cart.lastIndexOf(item[0])
      let newCart = [...cart]
      let removed = newCart.splice(idx, 1)
      setCart(newCart)
    }

    function viewCartPage(){
      setShowCartPage(true)
      setCartOpen(false)
      setShowProductPage(false)
    }

    function handleSelectedProduct(e) {
      const productSelected = data.categories[0].products.filter(product => product.name === e.target.childNodes[2].data)
      productSelected[0].inStock && setSelectedProduct(productSelected)
      setShowProductPage(true)
    }

    function productPageAddCart(e) {
      const newItem = data.categories[0].products.filter(obj => obj.name === e.target.parentElement.childNodes[0].childNodes[2].innerText)
      setCart(prev => [...prev, newItem[0]])
    }

    return(
      <div>
        <Nav categoryNav={categoryNav} selectorOpen={currencySelectorOpen} toggleSelector={toggleCurrencySelector} cart={cart} toggleCart={toggleCart}/>
        {currencySelectorOpen && <CurrencySelector changeCurrency={changeCurrency}/>}
        {cartOpen && <MiniCart viewCartPage={viewCartPage} currency={currency} total={total} handleAdd={handleAdd} handleSubtract={handleSubtract} cartOpen={cartOpen} symbol={symbol} cart={cart}/>}
        <div onClick={() => {setCartOpen(false) ; setCurrencySelectorOpen(false)}} className={cartOpen ? "fade-in" : ""} style={cartOpen ? {opacity:"0.7", backgroundColor:"rgba(57, 55, 72, 0.22)", height:"2000px"} : {}}>
        <h2 style={showCartPage || showProductPage ? {display: "none"} : {}} className="category-name">{categoryName}</h2>
        <section style={showCartPage || showProductPage ? {display: "none"} : {}}  className="products-section">
          <div className="product-cards-container">
            {data.categories[0].products.filter(obj => obj.category === category.category1 || obj.category === category.category2).map(product =>{
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
                    <p onClick={product.inStock ? handleSelectedProduct : null} className={product.inStock ? "card-name hover" : "card-name"}>{product.brand} {product.name}</p>
                    <p className="card-price">{product.prices[currency].currency.symbol}{product.prices[currency].amount}</p>
                </div>
                )
            })}
          </div>
        </section>
            {showCartPage && <CartPage currency={currency} total={total} handleAdd={handleBagAdd} handleSubtract={handleBagSubtract} cartOpen={cartOpen} symbol={symbol} cart={cart}/>}
            {showProductPage && <ProductPage productPageAddCart={productPageAddCart} currency={currency} selectedProduct={selectedProduct}/>}
        </div>
        </div>
    )
}