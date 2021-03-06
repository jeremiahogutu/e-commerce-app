import React, {useState, useEffect} from 'react';
import {isAuthenticated} from "../auth";
import Layout from "../main/Layout";
import {listOrders, getStatusValues, updateOrderStatus} from "./apiAdmin";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBook, faDollarSign} from "@fortawesome/free-solid-svg-icons";
import moment from 'moment'

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);

    const {user, token} = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setOrders(data)
            }
        })
    };

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setStatusValues(data)
            }
        })
    };

    useEffect(() => {
        loadOrders();
        loadStatusValues();
    }, []);

    const showOrdersLength = () => {
        if (orders.length > 0) {
            return (
                <h1 className='is-size-5 has-text-weight-bold has-text-black'>Total orders: {orders.length}</h1>
            )
        } else {
            return <h1 className='has-text-danger'>No orders</h1>
        }
    };

    const showInput = (key, value) => (
        <li className="panel-block">
            {key} : {value}
        </li>
    );

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value).then(data => {
            if (data.error) {
                console.log('Status update failed')
            } else {
                loadOrders()
            }
        })
    };

    const showStatus = order => (
        <div className="field">
            <label className="label">Status: {order.status}</label>
            <div className="control">
                <div className="select">
                    <select
                        onChange={e => handleStatusChange(e, order._id)}
                    >
                        <option>Update Status</option>
                        {statusValues.map((status, index) => (
                            <option key={index} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );

    return (
        <Layout
            title="Orders"
            description={`Hey ${user.name}, you can manage all the orders here!`}
        >
            <div style={{padding: '20px 15px', maxWidth: '600px', margin: '0 auto'}}>
                {showOrdersLength()}
                {orders.map((order, orderIndex) => {
                    return (
                        <div key={orderIndex} style={{margin: '25px 0'}}>
                            <h2 className="is-size-5 has-text-weight-bold has-text-black">Order ID: {order._id}</h2>
                            <div className="list">
                                <li className="list-item has-background-white">
                                    {/*Status: <span className="has-text-info">{order.status}</span>*/}
                                    {showStatus(order)}
                                </li>
                                <li className="list-item">
                                    Transaction ID: <span className="has-text-info">{order.transaction_id}</span>
                                </li>
                                <li className="list-item">
                                    Amount: <span className="has-text-info">${order.amount}</span>
                                </li>
                                <li className="list-item is-capitalized">
                                    Ordered By: <span className="has-text-info">{order.user.name}</span>
                                </li>
                                <li className="list-item">
                                    Ordered On: <span
                                    className="has-text-info">{moment(order.createdAt).fromNow()}</span>
                                </li>
                                <li className="list-item">
                                    Delivery Address: <span className="has-text-info">{order.address}</span>
                                </li>
                            </div>
                            <h3 className=" is-capitalized">
                                Total comic books ordered: <span
                            >{order.products.length}</span>
                            </h3>
                            {order.products.map((product, productIndex) => (
                                <div key={productIndex} style={{border: '1px solid indigo'}}>
                                    {showInput('Comic Book Name', product.name)}
                                    {showInput('Comic Book Price', product.price)}
                                    {showInput('Comic Book Total', product.count)}
                                    {showInput('Comic Book Id', product._id)}
                                </div>
                            ))}
                        </div>
                    )
                })}
            </div>
        </Layout>
    );
};

export default Orders;
