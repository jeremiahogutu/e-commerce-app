import React, {useState, useEffect} from 'react';
import Layout from './Layout'
import {getCart} from "./cartHelpers";
import {Link} from "react-router-dom";
import Card from "./card";
import '../App.css'
import Search from "./Search";

const Cart = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(getCart())
    }, [items]);

    const showItems = items => {
        return (
            <div>
                <div>
                    <h2 className="is-size-4 has-text-weight-bold has-text-black">Your cart
                        has {`${items.length}`} items</h2>
                    <hr/>
                </div>
                <div className="is-flex" style={{flexWrap: 'wrap', justifyContent: 'space-around'}}>
                    {items.map((product, i) => (
                        <div style={{width: '300px'}}>
                            <div className="card" style={{marginTop: '25px'}}>
                                <Card
                                    key={i}
                                    product={product}
                                    showAddToCartButton={false}
                                    cartUpdate={true}
                                    showRemoveProductButton={true}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    };

    const noItemsMessage = () => (
        <h2 className="is-size-4 has-text-weight-bold has-text-black">Your cart is empty. <br/> <Link
            to="/shop"> Continue shopping</Link></h2>
    );

    return (
        <Layout
            title="Shopping Cart"
            description="Manage your cart items. Add remove checkout or continue shopping."
        >
            <div className="columns">
                <div className="column is-half">
                    <div className="container is-fluid">
                        {items.length > 0 ? showItems(items) : noItemsMessage()}
                    </div>
                </div>
                <div className="column is-half">
                    <div className="container is-fluid">
                        <h2>show checkout options/shipping address/total/update quantity</h2>
                    </div>
                </div>
            </div>

        </Layout>
    );
};

export default Cart;
