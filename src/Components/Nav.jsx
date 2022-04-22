import { printIntrospectionSchema } from "graphql"
import React from "react"
import {Component} from "react"

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
        all:{color: "#5ece7b"},
        tech: {},
        clothes:{},
  }
  }

  render() {
    return (<nav style={{
      marginBottom: "-58px"
    }}>
            <ul>
                <li onClick={() => {
          this.setState({
            all:{color: "#5ece7b"},
            tech: {},
            clothes:{},
          })
        }} style={this.state.all}><a onClick={this.props.categoryNav} href="#">ALL</a></li>
                <li onClick={() => {
          this.setState({ 
            all:{},
            tech: {color: "#5ece7b"},
            clothes:{},
            })
        }} style={this.state.tech}><a onClick={this.props.categoryNav} href="#">TECH</a></li>
                <li onClick={() => {
          this.setState({
            all:{},
            tech: {},
            clothes:{color: "#5ece7b"},})
        }} style={this.state.clothes}><a onClick={this.props.categoryNav} href="#">CLOTHES</a></li>
            </ul>
            <div className="logo">
                <img src="./images/svg3.png" className="logo-box" alt="" />
                <img src="./images/svg19.png" className="logo-arrow" alt="" />
                <img src="./images/svg 21.png" className="logo-point" alt="" />
            </div>
            <div className="controls">
                <div onClick={this.props.toggleSelector} className="currency-selector-nav">$ <img src={this.props.selectorOpen ? "./images/up-arrow-nav.png" : "./images/arrow.png"} className="arrow" alt="" /></div>
                <div className="full-cart" onClick={this.props.toggleCart}>
                    <div className="cart"><img src="./images/Vector.png" alt="" /></div> {this.props.cart.length > 0 && <div className="cart-amount"><p>{this.props.cart.length}</p></div>}
                    <div className="wheels"><img src="./images/wheel.png" alt="" /><img src="./images/wheel.png" alt="" /></div>
                </div>
            </div>
        </nav>);
  }

}
 
export default Nav;