import React, {Fragment} from 'react';
import Layout from "../main/Layout";
import {isAuthenticated} from "../auth";
import {NavLink} from "react-router-dom";

const AdminDashboard = () => {

    const {user: {name, email, role}} = isAuthenticated();

    const adminLinks = () => {
        return (
            <Fragment>
                <div className="message-header has-background-grey-lighter">
                    <p className="has-text-black is-size-4">Admin Links</p>
                </div>
                <div className="message-body has-background-white"
                     style={{border: '1px solid #dbdbdb', borderTop: 0, padding: 0}}>
                    <div className="list" style={{borderRadius: 0}}>
                        <NavLink to="/create/category" className="list-item has-background-white has-text-link" style={{textDecoration: 'none'}}>
                            Create Category
                        </NavLink>
                        <NavLink to="/create/product" className="list-item has-background-white has-text-link" style={{textDecoration: 'none'}}>
                            Create Product
                        </NavLink>
                        <NavLink to="/admin/orders" className="list-item has-background-white has-text-link" style={{textDecoration: 'none'}}>
                            View Orders
                        </NavLink>
                        <NavLink to="/admin/orders" className="list-item has-background-white has-text-link" style={{textDecoration: 'none'}}>
                            Manage Orders
                        </NavLink>
                        <NavLink to="/admin/products" className="list-item has-background-white has-text-link" style={{textDecoration: 'none'}}>
                            Manage Products
                        </NavLink>
                    </div>
                </div>
            </Fragment>
        )
    };

    const adminInfo = () => {
        return (
            <Fragment>
                <div className="message-header has-background-grey-lighter">
                    <p className="has-text-black is-size-4">Admin Information</p>
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
                            Role {role === 1 ? 'Admin' : 'Registered User'}
                        </li>
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
                        {adminLinks()}
                    </div>
                    <div className="column is-three-quarters">
                        {adminInfo()}
                    </div>
                </div>
            </article>
        </Layout>
    );
};

export default AdminDashboard;
