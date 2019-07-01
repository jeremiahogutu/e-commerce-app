import React, {useState, useEffect} from 'react';
import {isAuthenticated} from "../auth";
import {Link} from "react-router-dom";
import {getBraintreeClientToken, processPayment, createOrder} from "./apiMain";
import DropIn from 'braintree-web-drop-in-react'
import {emptyCart} from "./cartHelpers";

const Checkout = ({products}) => {
    const [data, setData] = useState({
        loading: false,
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

    const handleAddress = event => {
        setData({
            ...data,
            address: event.target.value
        })
    };

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
        setData({loading: true});
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
                processPayment(userId, token, paymentData)
                    .then(response => {

                        const createOrderData = {
                            products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                            address: data.address
                        };
                        createOrder(userId, token, createOrderData)
                            .then(response => {

                            });
                        setData({
                            ...data,
                            success: response.success
                        });

                        emptyCart(() => {
                            console.log('payment success and empty cart');
                            setData({loading: false});
                        })
                    })
                    .catch(error => {
                        setData({loading: false})
                    })
            })
            .catch(error => {
                // console.log('dropin error', error);
                setData({...data, error: error.message})
            })
    };

    const showDropIn = () => (
        <div onBlur={() => setData({...data, error: ''})}>
            {data.clientToken !== null && products.length > 0 ? (
                <div className="is-flex" style={{flexDirection: 'column'}}>
                    <div className="field" style={{marginTop: '25px'}}>
                        <label className="label">Delivery address:</label>
                        <p className="control">
                    <textarea
                        className="textarea"
                        onChange={handleAddress}
                        placeholder="Type you delivery address here..."
                        value={data.address}
                    />
                        </p>
                    </div>
                    <DropIn
                        options={{
                            authorization: data.clientToken,
                            paypal: {
                                flow: 'vault'
                            }
                        }}
                        onInstance={instance => (data.instance = instance)}/>
                    <button onClick={purchase} className="button is-success" style={{width: '200px', alignSelf: 'center', marginTop: '15px'}}>Purchase</button>
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

    const showLoading = (loading) => (
        loading && (
            <h2 className="has-text-info">Loading...</h2>
        )
    );


    return (
        <div>
            <h2 className="is-size-4 has-text-weight-bold has-text-black">Total: ${getTotal()}</h2>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    )
};

export default Checkout