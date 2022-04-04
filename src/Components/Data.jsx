import React from 'react'
import MiniCart from './MiniCart';
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
    

    if(loading) return <div>Loading...</div>;
    if(error) return <div>Error</div>;

    console.log(cart)

    function toggleCart(){
      setCartOpen(!cartOpen)
    }

    let symbol = cart.length > 0 ? cart[0].prices[0].currency.symbol : ""

    //product card will need to console.log product data when clicked to then be transfered to product page



    return(
      <div>
        <Nav cart={cart} toggleCart={toggleCart}/>
        {cartOpen && <MiniCart cartOpen={cartOpen} symbol={symbol} cart={cart}/>}
        <div className={cartOpen ? "fade-in" : ""} style={cartOpen ? {opacity:"0.7", backgroundColor:"rgba(57, 55, 72, 0.22)", height:"2000px"} : {}}>
        <h2 className="category-name">Category name</h2>
        <section className="products-section">
          <div className="product-cards-container">
            {data.categories[0].products.map(product =>{
                return(
                <div onMouseOver={() => {
                  setIsHovering(true) ; setTargetId(product.id)
                }}  key={product.id} className="product-card">
                    {!product.inStock ? <img style={{opacity:"0.4"}} src={product.gallery[0]} className="card-img" alt="" /> : <img src={product.gallery[0]} className="card-img" alt="" />}
                    {!product.inStock && <div className="out-of-stock">OUT OF STOCK</div>}
                    {isHovering && product.inStock && targetId === product.id &&  
                    <div className="add-cart-btn" onClick={() => setCart(prev => [...prev, product])}>
                      <img className="add-cart" src="./images/white-cart.png" alt="" />
                    <div className="add-wheels">
                      <img src="./images/white-wheel.png" alt="" />
                      <img src="./images/white-wheel.png" alt="" />
                     </div>
                    </div>}
                    <p className="card-name">{product.name}</p>
                    <p className="card-price">{product.prices[0].currency.symbol}{product.prices[0].amount}</p>
                </div>
                )
            })}
          </div>
        </section>
        </div>
        </div>
    )
}