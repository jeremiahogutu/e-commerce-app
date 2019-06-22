import React, {useState} from 'react';
import Layout from "../main/Layout";
import {Redirect} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faEnvelope, faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import {signin, authenticate} from "../auth";

const Signin = () => {
    const [values, setValues] = useState({
        email: 'david@pm.me',
        password: 'test1234',
        error: '',
        loading: false,
        redirectToReferrer: false
    });

    const {email, password, loading, error, redirectToReferrer} = values;

    const handleChange = userInput => event => {
        setValues({
            ...values,
            error: false,
            [userInput]: event.target.value
        });
        document.getElementById('emailErrorIcon').style.visibility = 'hidden';
        document.getElementById('emailErrorMessage').style.visibility = 'hidden';
        document.getElementById('userEmail').classList.remove('is-danger');
        document.getElementById('passwordErrorIcon').style.visibility = 'hidden';
        document.getElementById('passwordErrorMessage').style.visibility = 'hidden';
        document.getElementById('userPassword').classList.remove('is-danger')
    };


    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, error: false, loading: true});
        signin({email, password})
            .then(data => {
                if (data.error) {
                    setValues({
                        ...values,
                        error: data.error,
                        loading: false,
                        redirectToReferrer: false,
                    })
                } else {
                    authenticate(data, () => {
                            setValues({
                                ...values,
                                redirectToReferrer: true
                            })
                        }
                    )
                }
            })
    };

    const showError = () => {
        if (error === "Email is required") {
            document.getElementById('emailErrorIcon').style.visibility = 'visible';
            document.getElementById('emailErrorMessage').style.visibility = 'visible';
            document.getElementById('userEmail').classList.add('is-danger')
        } else if (error === "Email is invalid") {
            document.getElementById('emailErrorIcon').style.visibility = 'visible';
            document.getElementById('emailErrorMessage').style.visibility = 'visible';
            document.getElementById('userEmail').classList.add('is-danger')
        } else if (error === "Password is required" || error === "Password must contain at least 6 characters" || error === "Password must contain a number" || error === "Password must contain a letter") {
            document.getElementById('passwordErrorIcon').style.visibility = 'visible';
            document.getElementById('passwordErrorMessage').style.visibility = 'visible';
            document.getElementById('userPassword').classList.add('is-danger')
        } else if (error === "Email and password don't match") {
            return (
                <div className="has-text-danger" style={{display: 'block'}}>
                    {error}
                </div>
            )
        }
    };

    const showLoading = () => (
        loading && (<div className="has-text-info">
            <h2>Loading...</h2>
        </div>)
    );

    const redirectUser = () => {
        if (redirectToReferrer) {
            return <Redirect to="/"/>
        }
    };

    const signInForm = () => (
        <form name="myForm" style={{maxWidth: '900px'}}>
            <div className="field">
                <label className="label">Email</label>
                <p className="control has-icons-left has-icons-right">
                    <input
                        id="userEmail"
                        onChange={handleChange('email')}
                        className="input"
                        type="email"
                        placeholder="Email"
                        value={email}
                    />
                    <span className="icon is-small is-left">
      <FontAwesomeIcon icon={faEnvelope}/>
    </span>
                    <span id="emailErrorIcon" className="icon is-small is-right" style={{visibility: 'hidden'}}>
      <FontAwesomeIcon icon={faExclamationTriangle}/>
    </span>
                </p>
            </div>
            <p id="emailErrorMessage" className="help is-danger" style={{visibility: 'hidden'}}>{error}</p>
            <div className="field">
                <label className="label">Password</label>
                <p className="control has-icons-left has-icons-right">
                    <input
                        id="userPassword"
                        onChange={handleChange('password')}
                        className="input"
                        type="password"
                        placeholder="Password"
                        value={password}
                    />
                    <span className="icon is-small is-left">
      <FontAwesomeIcon icon={faLock}/>
    </span>
                    <span id="passwordErrorIcon" className="icon is-small is-right" style={{visibility: 'hidden'}}>
      <FontAwesomeIcon icon={faExclamationTriangle}/>
    </span>
                </p>
            </div>
            <p id="passwordErrorMessage" className="help is-danger" style={{visibility: 'hidden'}}>{error}</p>
            <div className="field">
                <p className="control">
                    <button onClick={clickSubmit} className="button is-success">
                        Sign In
                    </button>
                </p>
            </div>
        </form>
    );

    return (
        <Layout
            title="Signin"
            description="Signin to Node React E-commerce App"
            className="container is-fluid is-flex is-centered"
        >
            <div className="notification has-background-white">
                {showLoading()}
                {showError()}
                {signInForm()}
                {redirectUser()}
                {/*{JSON.stringify(values)}*/}
            </div>
        </Layout>
    );
};

export default Signin;
