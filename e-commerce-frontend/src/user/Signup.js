import React from 'react';
import Layout from "../main/Layout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faUser, faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {API} from "../config";

const Signup = () => {
    const signUpForm = () => (
        <form style={{maxWidth: '900px'}}>
            <div className="field">
                <label className="label">Name</label>
                <p className="control is-expanded has-icons-left">
                    <input className="input" type="text" placeholder="Name"/>
                    <span className="icon is-small is-left">
          <FontAwesomeIcon icon={faUser}/>
        </span>
                </p>
            </div>
            <div className="field">
                <label className="label">Email</label>
                <p className="control has-icons-left has-icons-right">
                    <input className="input" type="email" placeholder="Email"/>
                    <span className="icon is-small is-left">
      <FontAwesomeIcon icon={faEnvelope}/>
    </span>
                    <span className="icon is-small is-right">
      <i className="fas fa-check"/>
    </span>
                </p>
            </div>
            <div className="field">
                <label className="label">Password</label>
                <p className="control has-icons-left">
                    <input className="input" type="password" placeholder="Password"/>
                    <span className="icon is-small is-left">
      <FontAwesomeIcon icon={faLock}/>
    </span>
                </p>
            </div>
            <div className="field">
                <p className="control">
                    <button className="button is-success">
                        Login
                    </button>
                </p>
            </div>
        </form>
    );

    return (
        <Layout
            title="Signup"
            description="Signup to Node React E-commerce App"
            className="container is-fluid is-flex is-centered"
        >
            <div className="notification has-background-white">
                {signUpForm()}
            </div>
        </Layout>
    );
};

export default Signup;
