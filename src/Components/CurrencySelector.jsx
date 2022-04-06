import { printIntrospectionSchema } from "graphql";

const CurrencySelector = (props) => {
    return ( 
        <div className="currency-selector">
            <div onClick={props.changeCurrency} className="usd">
                <p>$ USD</p>
            </div>
            <div onClick={props.changeCurrency} className="gbp">
                <p>£ GBP</p>
            </div>
            <div onClick={props.changeCurrency} className="jpy">
                <p>¥ JPY</p>
            </div>
        </div>
     );
}
 
export default CurrencySelector;