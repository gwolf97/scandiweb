import React from 'react'
import AddCart from './AddCart';
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

    console.log(cartOpen)

    function toggleCart(){
      setCartOpen(!cartOpen)
    }

    //add an onclick to the add to cart button that can console.log the data of the item to then be transfered to cart
    //product card will also need to console.log product data when clicked to then be transfered to product page



    return(
      <div>
        <Nav cart={cart} toggleCart={toggleCart}/>
        {cartOpen && <div className="sm-grey-overlay"></div>}
        <div style={cartOpen ? {opacity:"0.5", backgroundColor:"lightgrey", height:"2000px"} : {}}>
        
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