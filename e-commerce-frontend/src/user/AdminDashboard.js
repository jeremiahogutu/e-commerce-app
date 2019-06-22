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
                    </div>
                </div>
            </Fragment>
        )
    };

    const adminInfo = () => {
        return (
            <Fragment>
                <div className="message-header has-background-grey-lighter">
                    <p className="has-text-black is-size-4">User Information</p>
                </div>
                <div className="message-body has-background-white"
                     style={{border: '1px solid #dbdbdb', borderTop: 0, padding: 0}}>
                    <div className="list" style={{borderRadius: 0}}>
                        <li className="list-item">
                            {name}
                        </li>
                        <li className="list-item">
                            {email}
                        </li>
                        <li className="list-item">
                            {role === 1 ? 'Admin' : 'Registered User'}
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
            className="is-flex"
        >
            <article className="message has-background-white"
                     style={{marginTop: '15px', padding: '25px', flexGrow: 1}}>
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
