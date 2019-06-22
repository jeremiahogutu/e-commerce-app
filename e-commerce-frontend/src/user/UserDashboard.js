import React from 'react';
import Layout from "../main/Layout";
import {isAuthenticated} from "../auth";

const Dashboard = () => {

    const {user: {name, email, role}} = isAuthenticated();

    return (
        <Layout
            title="Dashboard"
            description="User Dashboard"
            className="is-flex"
        >
            <article className="message has-background-white" style={{maxWidth: '900px', marginTop: '40px', flexGrow: 1}}>
                <div className="message-header has-background-grey-lighter">
                    <p className="has-text-black is-size-4">User Information</p>
                </div>
                <div className="message-body has-background-white" style={{border: '1px solid #dbdbdb', borderTop: 0, padding: 0}}>
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
                <div className="message-header has-background-grey-lighter" style={{marginTop: '40px'}}>
                    <p className="has-text-black is-size-4">Purchase history</p>
                </div>
                <div className="message-body has-background-white" style={{border: '1px solid #dbdbdb', borderTop: 0, padding: 0}}>
                    <div className="list" style={{borderRadius: 0}}>
                        <li className="list-item">
                            history
                        </li>
                    </div>
                </div>
            </article>
        </Layout>
    );
};

export default Dashboard;
