import React, {useState, useEffect} from 'react';
import {isAuthenticated} from "../auth";
import {Link} from "react-router-dom";
import {getBraintreeClientToken} from "./apiMain";
import Dropin from 'braintree-web-drop-in-react'

const Checkout = ({products}) => {
    const  [data, setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if (data.error) {
                setData({...data, error: data.error})
            } else {
                setData({...data, clientToken: data.clientToken})
            }
        })
    }

    useEffect(() => {
        getToken(userId, token)
    }, []);
    
    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <Link to="/signin">
                <button className="button is-success">Sign In To Checkout</button>
            </Link>
        )
    };

    const showDropIn = () => (
        <div>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <Dropin options={{
                        authorization: data.clientToken
                    }} onInstance={instance => (data.instance = instance)}/>
                    <button className="button is-success">Checkout</button>
                </div>
            ) : null}
        </div>
    )


    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showCheckout()}
        </div>
    )
};

export default Checkout