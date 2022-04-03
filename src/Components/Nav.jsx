import { printIntrospectionSchema } from "graphql"
import React from "react"

const Nav = (props) => {
    const [women, setWomen] = React.useState({})
    const [men, setMen] = React.useState({})
    const [kids, setKids] = React.useState({})

    const colorGreen = {
        color: "#5ece7b"
    }

    return ( 
        <nav>
            <ul>
                <li onClick={() => {setWomen(colorGreen); setMen({}) ; setKids({})}} style={women}><a href="#">WOMEN</a></li>
                <li onClick={() => {setMen(colorGreen); setWomen({}) ; setKids({})}} style={men}><a href="#">MEN</a></li>
                <li onClick={() => {setKids(colorGreen); setWomen({}) ; setMen({})}} style={kids}><a href="#">KIDS</a></li>
            </ul>
            <div className="logo">
                <img src="./images/svg3.png" className="logo-box" alt="" />
                <img src="./images/svg19.png" className="logo-arrow" alt="" />
                <img src="./images/svg 21.png" className="logo-point" alt="" />
            </div>
            <div className="controls">
                <div className="currency-selector">$ <img src="./images/arrow.png" className="arrow" alt="" /></div>
                <div className="full-cart" onClick={props.toggleCart}>
                    <div className="cart"><img src="./images/Vector.png" alt="" /></div> {props.cart.length > 0 && <div className="cart-amount"><p>{props.cart.length}</p></div>}
                    <div className="wheels"><img src="./images/wheel.png" alt="" /><img src="./images/wheel.png" alt="" /></div>
                </div>
            </div>
        </nav>
     );
}
 
export default Nav;