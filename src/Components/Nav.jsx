import { printIntrospectionSchema } from "graphql"
import React from "react"

const Nav = (props) => {
    const [all, setAll] = React.useState({ color: "#5ece7b"})
    const [tech, setTech] = React.useState({})
    const [clothes, setClothes] = React.useState({})

    const colorGreen = {
        color: "#5ece7b"
    }

    return ( 
        <nav style={{marginBottom:"-58px"}}>
            <ul>
                <li onClick={() => {setAll(colorGreen); setTech({}) ; setClothes({})}} style={all}><a onClick={props.categoryNav} href="#">ALL</a></li>
                <li onClick={() => {setTech(colorGreen); setAll({}) ; setClothes({})}} style={tech}><a onClick={props.categoryNav} href="#">TECH</a></li>
                <li onClick={() => {setClothes(colorGreen); setAll({}) ; setTech({})}} style={clothes}><a onClick={props.categoryNav} href="#">CLOTHES</a></li>
            </ul>
            <div className="logo">
                <img src="./images/svg3.png" className="logo-box" alt="" />
                <img src="./images/svg19.png" className="logo-arrow" alt="" />
                <img src="./images/svg 21.png" className="logo-point" alt="" />
            </div>
            <div className="controls">
                <div onClick={props.toggleSelector} className="currency-selector-nav">$ <img src={props.selectorOpen ? "./images/up-arrow-nav.png" : "./images/arrow.png"} className="arrow" alt="" /></div>
                <div className="full-cart" onClick={props.toggleCart}>
                    <div className="cart"><img src="./images/Vector.png" alt="" /></div> {props.cart.length > 0 && <div className="cart-amount"><p>{props.cart.length}</p></div>}
                    <div className="wheels"><img src="./images/wheel.png" alt="" /><img src="./images/wheel.png" alt="" /></div>
                </div>
            </div>
        </nav>
     );
}
 
export default Nav;