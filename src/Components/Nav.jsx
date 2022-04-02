const Nav = () => {
    return ( 
        <nav>
            <ul>
                <li><a href="#">WOMEN</a></li>
                <li><a href="#">MEN</a></li>
                <li><a href="#">KIDS</a></li>
            </ul>
            <div className="logo">
                <img src="./images/svg3.png" className="logo-box" alt="" />
                <img src="./images/svg19.png" className="logo-arrow" alt="" />
                <img src="./images/svg 21.png" className="logo-point" alt="" />
            </div>
            <div className="controls">
                <div className="currency-selector">$ <img src="./images/arrow.png" className="arrow" alt="" /></div>
                <div className="full-cart">
                    <div className="cart"><img src="./images/Vector.png" alt="" /></div> 
                    <div className="wheels"><img src="./images/wheel.png" alt="" /><img src="./images/wheel.png" alt="" /></div>
                </div>
            </div>
        </nav>
     );
}
 
export default Nav;