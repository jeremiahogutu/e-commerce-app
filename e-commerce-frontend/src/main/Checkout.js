import React from 'react';
import {isAuthenticated} from "../auth";
import {Link} from "react-router-dom";

const Checkout = ({products}) => {
    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <button className="button is-success">Checkout</button>
        ) : (
            <Link to="/signin">
                <button className="button is-success">Sign In To Checkout</button>
            </Link>
        )
    };

    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showCheckout()}
        </div>
    )
};

export default Checkout