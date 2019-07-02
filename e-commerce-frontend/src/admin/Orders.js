import React, {useState, useEffect} from 'react';
import {isAuthenticated} from "../auth";
import Layout from "../main/Layout";
import {listOrders} from "./apiAdmin";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    const {user, token} = isAuthenticated()

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setOrders(data)
            }
        })
    };

    useEffect(() => {
        loadOrders()
    }, [])

    const noOrders = orders => {
        return orders.length < 1 ? <h4>No orders</h4> : null;

    }

    return (
        <Layout
            title="Orders"
            description={`Hey ${user.name}, you can manage all the order here!`}
            className="is-flex"
        >
            <div className="notification has-background-white">
                {noOrders(orders)}
                {JSON.stringify(orders)}
            </div>
        </Layout>
    );
};

export default Orders;
