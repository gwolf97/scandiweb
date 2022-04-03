const AddCart = (props) => {
    return ( 
        <div value={props.product} className="add-cart-btn" onClick={props.handleAdd}>
        <img className="add-cart" src="./images/white-cart.png" alt="" />
        <div className="add-wheels">
          <img src="./images/white-wheel.png" alt="" />
          <img src="./images/white-wheel.png" alt="" />
        </div>
      </div>
     );
}
 
export default AddCart;