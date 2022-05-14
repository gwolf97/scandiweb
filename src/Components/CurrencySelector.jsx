import { printIntrospectionSchema } from "graphql";
import {Component} from "react"

class CurrencySelector extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className="currency-selector">
            <div onClick={this.props.changeCurrency} className="usd">
                <p>$ USD</p>
            </div>
            <div onClick={this.props.changeCurrency} className="gbp">
                <p>£ GBP</p>
            </div>
            <div onClick={this.props.changeCurrency} className="aud">
                <p>A$ AUD</p>
            </div>
            <div onClick={this.props.changeCurrency} className="rub">
                <p>₽ RUB</p>
            </div>
            <div onClick={this.props.changeCurrency} className="jpy">
                <p>¥ JPY</p>
            </div>
        </div>);
  }

}
 
export default CurrencySelector;