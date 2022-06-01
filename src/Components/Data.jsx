import { ProductGalleryPage } from './ProductGalleryPage';
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
      attributes{
        id
        name
        type
        items{
          displayValue
          value
          id
        }
      }
    }
  }
}
`





export default function Data(props){
    const {error, data, loading} = useQuery(GET_PRODUCTS);
    const [isHovering, setIsHovering] = React.useState(false)
    const [targetId, setTargetId] = React.useState((""))
    const [selectedProduct, setSelectedProduct] = React.useState([])
    const [selectedAttribute, setSelectedAttribute] = React.useState("")
    const [selectedAttributes, setSelectedAttributes] = React.useState([])
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

    React.useEffect(() => {
      setSelectedAttributes(prev => [...prev.filter(obj=> obj.id !== selectedAttribute.id), selectedAttribute].sort((a,b) =>{
        let fa = a.id,
        fb = b.id;

    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
      }))
    }, [selectedAttribute])

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
      setSelectedAttribute("")
      setSelectedAttributes([])
      setCartOpen(false)
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
      e.target.innerText === "$ USD" && setCurrency(0)
      e.target.innerText === "£ GBP" && setCurrency(1)
      e.target.innerText === "A$ AUD" && setCurrency(2)
      e.target.innerText === "¥ JPY" && setCurrency(3)
      e.target.innerText === "₽ RUB" && setCurrency(4)
    }

    console.log(data)

    function handleAdd(e) {
      let attributeDivs = e.target.parentElement.parentElement.childNodes[0].childNodes[1].childNodes[0].childNodes
      let selectedAttributes = [...attributeDivs].map(obj => obj.innerText === "No " ? 'No' : obj.innerText)

      let cartWithNoDuplicates = cart.reduce(function (previousValue, currentValue) {
        if (previousValue.indexOf(currentValue) === -1) {
            previousValue.push(currentValue)
        }
        return previousValue
        }, [])
    
      let noDuplicates = Array.from(new Set(cartWithNoDuplicates.map(JSON.stringify))).map(JSON.parse);

      let newItem = noDuplicates.filter(obj => obj.selectedAttributes.map(x => x.attribute === "Yes" ? `${x.id === 'Touch ID in keyboard' ? "Touch ID" : "USB x 3"}` :  x.attribute).toString() === selectedAttributes.toString())
      setCart(prev => [...prev, newItem[0]])
    }

    function handleSubtract(e) {
      let attributeDivs = e.target.parentElement.parentElement.childNodes[0].childNodes[1].childNodes[0].childNodes
      let selectedAttributes = [...attributeDivs].map(obj => obj.innerText === "No " ? 'No' : obj.innerText)

      let cartWithNoDuplicates = cart.reduce(function (previousValue, currentValue) {
        if (previousValue.indexOf(currentValue) === -1) {
            previousValue.push(currentValue)
        }
        return previousValue
        }, [])
    
      let noDuplicates = Array.from(new Set(cartWithNoDuplicates.map(JSON.stringify))).map(JSON.parse);

      let item = noDuplicates.filter(obj => obj.selectedAttributes.map(x => x.attribute === "Yes" ? `${x.id === 'Touch ID in keyboard' ? "Touch ID" : "USB x 3"}` :  x.attribute).toString() === selectedAttributes.toString())

      let idx = cart.map(obj => JSON.stringify(obj.selectedAttributes)).lastIndexOf(JSON.stringify(item[0].selectedAttributes))
      let newCart = [...cart]
      let removed = newCart.splice(idx, 1)
      setCart(newCart)
    }


    function viewCartPage(){
      setShowCartPage(true)
      setCartOpen(false)
      setShowProductPage(false)
      setSelectedAttribute("")
      setSelectedAttributes([])
    }

    function handleSelectedProduct(e) {
      console.log(e.target.parentElement.childNodes[2].childNodes[2].data)
      const productSelected = data.categories[0].products.filter(product => product.name === (e.target.parentElement.childNodes[2].childNodes[2].data|| e.target.childNodes[2].childNodes[2].data || e.target.childNodes[2].data )) 
      setSelectedProduct(productSelected)
      setShowProductPage(true)
      setShowCartPage(false)
      setCartOpen(false)
      const firstAttributes = productSelected[0].attributes.map(obj => {return{attribute: obj.items[0].displayValue, id: obj.id}})
      setSelectedAttributes(firstAttributes)
    }

    function handleSelectedProductCart(e) {
      const productSelected = data.categories[0].products.filter(product => product.name === e.target.innerText)
      productSelected[0].inStock && setSelectedProduct(productSelected)
      setShowProductPage(true)
      setShowCartPage(false)
      setCartOpen(false)
      const firstAttributes = productSelected[0].attributes.map(obj => {return{attribute: obj.items[0].displayValue, id: obj.id}})
      setSelectedAttributes(firstAttributes)
    }

    function handleGreenCart(product) {
      const productSelected = data.categories[0].products.filter(obj => obj === product)
      productSelected[0].inStock && setSelectedProduct(productSelected)
      setShowProductPage(true)
      const firstAttributes = productSelected[0].attributes.map(obj => {return{attribute: obj.items[0].displayValue, id: obj.id}})
      setSelectedAttributes(firstAttributes)
    }

    function handleSelectedAttribute(e){
      setSelectedAttribute({attribute: e.target.innerText, id: e.target.id,}) 
    }

    function productPageAddCart(e) {
      const newItem = data.categories[0].products.filter(obj => obj.name === e.target.parentElement.childNodes[0].childNodes[2].innerText)
      const itemData = newItem[0]
      const itemWithAttribute = {...itemData, selectedAttributes: selectedAttributes}
     setCart(prev => [...prev, itemWithAttribute])
    }

    return(
      <div>
        <Nav categoryNav={categoryNav} selectorOpen={currencySelectorOpen} toggleSelector={toggleCurrencySelector} cart={cart} toggleCart={toggleCart}/>
        {currencySelectorOpen && <CurrencySelector changeCurrency={changeCurrency}/>}
        {cartOpen && <MiniCart handleSelectedProduct={handleSelectedProductCart} viewCartPage={viewCartPage} currency={currency} total={total} handleAdd={handleAdd} handleSubtract={handleSubtract} cartOpen={cartOpen} symbol={symbol} cart={cart}/>}
        <div onClick={() => {setCartOpen(false) ; setCurrencySelectorOpen(false)}} className={cartOpen ? "fade-in" : ""} style={cartOpen ? {opacity:"0.7", backgroundColor:"rgba(57, 55, 72, 0.22)", height:"2000px"} : {}}>
        <h2 style={showCartPage || showProductPage ? {display: "none"} : {}} className="category-name">{categoryName}</h2>
            <ProductGalleryPage currency={currency} data={data} category={category} showCartPage={showCartPage} showProductPage={showProductPage} setIsHovering={setIsHovering} setTargetId={setTargetId} isHovering={isHovering} cartOpen={cartOpen} targetId={targetId} handleGreenCart={handleGreenCart} handleSelectedProduct={handleSelectedProduct}  />
            {showCartPage && <CartPage handleSelectedProduct={handleSelectedProductCart} selectedAttribute={selectedAttributes} currency={currency} total={total} handleAdd={handleAdd} handleSubtract={handleSubtract} cartOpen={cartOpen} symbol={symbol} cart={cart}/>}
            {showProductPage && <ProductPage selectedAttributes={selectedAttributes} selectedAttribute={selectedAttribute} handleSelectedAttribute={handleSelectedAttribute} productPageAddCart={productPageAddCart} currency={currency} selectedProduct={selectedProduct}/>}
        </div>
        </div>
    )
}