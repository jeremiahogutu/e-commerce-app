import React, {useState, useEffect} from 'react';
import {isAuthenticated} from "../auth";
import {Link} from "react-router-dom";
import {getBraintreeClientToken, processPayment} from "./apiMain";
import DropIn from 'braintree-web-drop-in-react'

const Checkout = ({products}) => {
    const [data, setData] = useState({
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
                setData({clientToken: data.clientToken})
            }
        })
    };

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

    const purchase = () => {
        // send the nonce to your server
        // nonce = data.instance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instance
            .requestPaymentMethod()
            .then(data => {
                // console.log(data);
                nonce = data.nonce;
                // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
                // and also total to be charged
                // console.log(
                //     'send nonce and total to process: ',
                //     nonce,
                //     getTotal(products))
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                };
                console.log(paymentData);
                processPayment(userId, token, paymentData)
                    .then(response => {
                        setData({
                            ...data,
                            success: response.success
                        })
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => {
                // console.log('dropin error', error);
                setData({...data, error: error.message})
            })
    };

    const showDropIn = () => (
        <div onBlur={() => setData({...data, error: ''})}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <DropIn options={{
                        authorization: data.clientToken
                    }} onInstance={instance => (data.instance = instance)}/>
                    <button onClick={purchase} className="button is-success">Purchase</button>
                </div>
            ) : null}
        </div>
    );

    const showError = error => (
        <div className="has-text-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    const showSuccess = success => (
        <div className="has-text-success" style={{display: success ? '' : 'none'}}>
            Thank you! Payment was successful!
        </div>
    );


    return (
        <div>
            <h2 className="is-size-4 has-text-weight-bold has-text-black">Total: ${getTotal()}</h2>
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    )
};

export default Checkout