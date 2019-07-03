import React, {Fragment, useState, useEffect} from 'react';
import Layout from "../main/Layout";
import {isAuthenticated} from "../auth";
import {NavLink} from "react-router-dom";
import {getPurchaseHistory} from "./ApiUser";
import moment from "moment";

const Dashboard = () => {

    const [history, setHistory] = useState([]);

    const {user: {_id, name, email, role}} = isAuthenticated();

    const token = isAuthenticated().token;

    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setHistory(data)
            }
        })
    };

    useEffect(() => {
        init(_id, token)
    }, []);

    const userLinks = () => {
        return (
            <Fragment>
                <div className="message-header has-background-grey-lighter">
                    <p className="has-text-black is-size-4">User Links</p>
                </div>
                <div className="message-body has-background-white"
                     style={{border: '1px solid #dbdbdb', borderTop: 0, padding: 0}}>
                    <div className="list" style={{borderRadius: 0}}>
                        <NavLink to="/cart" className="list-item has-background-white has-text-link"
                                 style={{textDecoration: 'none'}}>
                            My Cart
                        </NavLink>
                        <NavLink to={`/profile/${_id}`} className="list-item has-background-white has-text-link"
                                 style={{textDecoration: 'none'}}>
                            Update Profile
                        </NavLink>
                    </div>
                </div>
            </Fragment>
        )
    };

    const userInfo = () => {
        return (
            <Fragment>
                <div className="message-header has-background-grey-lighter">
                    <p className="has-text-black is-size-4">User Information</p>
                </div>
                <div className="message-body has-background-white"
                     style={{border: '1px solid #dbdbdb', borderTop: 0, padding: 0}}>
                    <div className="list" style={{borderRadius: 0}}>
                        <li className="list-item">
                            Name: {name}
                        </li>
                        <li className="list-item">
                            Email: {email}
                        </li>
                        <li className="list-item">
                            Role: {role === 1 ? 'Admin' : 'Registered User'}
                        </li>
                    </div>
                </div>
            </Fragment>
        )
    };

    const purchaseHistory = (history) => {
        return (
            <Fragment>
                <div className="message-header has-background-grey-lighter" style={{marginTop: '40px'}}>
                    <p className="has-text-black is-size-4">Purchase history</p>
                </div>
                <div className="message-body has-background-white"
                     style={{border: '1px solid #dbdbdb', borderTop: 0, padding: 0}}>
                    <div className="list" style={{borderRadius: 0}}>
                        {history.map((h, i) => {
                            return (
                                <li className="list-item">
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <h6>Comic Book Name: {p.name}</h6>
                                                <h6>Comic Book Price: ${p.price}</h6>
                                                <h6>
                                                    Purchase Date: {" "}
                                                    {moment(p.createdAt).fromNow()}
                                                </h6>
                                            </div>
                                        )
                                    })}
                                </li>
                            )
                        })}
                        {/*{JSON.stringify(history)}*/}
                    </div>
                </div>
            </Fragment>
        )
    };

    return (
        <Layout
            title="Dashboard"
            description={`Hey ${name}!`}
            className="is-flex hero-body"
        >
            <article className="container message has-background-white"
                     style={{marginTop: '15px', flexGrow: 1}}>
                <div className="columns">
                    <div className="column">
                        {userLinks()}
                    </div>
                    <div className="column is-three-quarters">
                        {userInfo()}
                        {purchaseHistory(history)}
                    </div>
                </div>
            </article>
        </Layout>
    );
};

export default Dashboard;
