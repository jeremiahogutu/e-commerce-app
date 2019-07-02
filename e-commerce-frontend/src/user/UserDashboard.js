import React, {Fragment} from 'react';
import Layout from "../main/Layout";
import {isAuthenticated} from "../auth";
import {NavLink} from "react-router-dom";

const Dashboard = () => {

    const {user: {_id, name, email, role}} = isAuthenticated();

    const userLinks = () => {
        return (
            <Fragment>
                <div className="message-header has-background-grey-lighter">
                    <p className="has-text-black is-size-4">User Links</p>
                </div>
                <div className="message-body has-background-white"
                     style={{border: '1px solid #dbdbdb', borderTop: 0, padding: 0}}>
                    <div className="list" style={{borderRadius: 0}}>
                        <NavLink to="/cart" className="list-item has-background-white has-text-link" style={{textDecoration: 'none'}}>
                            My Cart
                        </NavLink>
                        <NavLink to={`/profile/${_id}`} className="list-item has-background-white has-text-link" style={{textDecoration: 'none'}}>
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

    const purchaseHistory = () => {
        return (
            <Fragment>
                <div className="message-header has-background-grey-lighter" style={{marginTop: '40px'}}>
                    <p className="has-text-black is-size-4">Purchase history</p>
                </div>
                <div className="message-body has-background-white"
                     style={{border: '1px solid #dbdbdb', borderTop: 0, padding: 0}}>
                    <div className="list" style={{borderRadius: 0}}>
                        <li className="list-item">
                            history
                        </li>
                    </div>
                </div>
            </Fragment>
        )
    }

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
                        {purchaseHistory()}
                    </div>
                </div>
            </article>
        </Layout>
    );
};

export default Dashboard;
