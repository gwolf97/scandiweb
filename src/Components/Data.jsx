import React from 'react'
import AddCart from './AddCart';
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
    console.log({error, loading, data})

    if(loading) return <div>Loading...</div>
    if(error) return <div>Error</div>



  function handleMouseOver() {
   
    setIsHovering(true)
  }

  function handleMouseOut() {
    setIsHovering(false)
  }

//replace div with real card image code
//<img src={product.gallery[0]} className="card-img" alt="" />

    //event mouse over look for target id and set to state. 
    //function handleChange(e) {} 

    //then add terinary where if the id matches the add to cart will show
    //add an onclick to the add to cart button that can console.log the data of the item to then be transfered to cart
    //product card will also need to console.log product data when clicked to then be transfered to product page

    return(
        <section className="products-section">
          <div className="product-cards-container">
            {data.categories[0].products.map(product =>{
                return(
                <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={() => console.log(product)} key={product.id} className="product-card">
                    <img src={product.gallery[0]} className="card-img" alt="" />
                    {isHovering && <AddCart/>}
                    <p className="card-name">{product.name}</p>
                    <p className="card-price">{product.prices[0].currency.symbol}{product.prices[0].amount}</p>
                </div>
                )
            })}
          </div>
        </section>
    )
}