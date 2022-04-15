import React from "react"
import { nanoid } from "nanoid"

const MiniProduct = (props) => {

    let amount = props.cart.filter(x => JSON.stringify(x.selectedAttributes) === JSON.stringify(props.selectedAttributes)).length

  let attributeMiniSquares = props.selectedAttributes.map(obj => obj !== "" && <div key={nanoid()} className={obj.attribute === "No" ? "hide" : "mini-size"}>{obj.attribute === "Yes" ? `${obj.id === 'Touch ID in keyboard' ? "Touch ID" : "USB x 3"}` : obj.attribute} </div>)

    return ( 
        <div className="mini-product" key={nanoid()}>
            <div className="mini-description">
                <div className="mini-details">
                    <p className="mini-brand">{props.brand}</p>
                    <p className="mini-name">{props.name}</p>
                    <p className="mini-price">{props.symbol}{props.price}</p>
                </div>
                <div className="mini-sizes">
                    <div className="sizes-scroll">
                    {attributeMiniSquares}
                    </div>
                </div>
            </div>
            <div className="mini-controls">
                <div onClick={props.handleAdd} className="mini-add">+</div>
                <p className="mini-amount">{amount}</p>
                <div onClick={props.handleSubtract} className="mini-subtract">-</div>
            </div>
            <img src={props.img} alt="" />
        </div>
     );
}
 
export default MiniProduct;