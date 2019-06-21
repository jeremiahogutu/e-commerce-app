import React, {useState} from 'react';
import Layout from "../main/Layout";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faUser, faEnvelope, faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import {signup} from "../auth";

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const {name, email, password, success, error} = values;

    const handleChange = userInput => event => {
        setValues({
            ...values,
            error: false,
            [userInput]: event.target.value
        });

        document.getElementById('userNameErrorIcon').style.visibility = 'hidden';
        document.getElementById('userNameErrorMessage').style.visibility = 'hidden';
        document.getElementById('userName').classList.remove('is-danger');
        document.getElementById('emailErrorIcon').style.visibility = 'hidden';
        document.getElementById('emailErrorMessage').style.visibility = 'hidden';
        document.getElementById('userEmail').classList.remove('is-danger');
        document.getElementById('passwordErrorIcon').style.visibility = 'hidden';
        document.getElementById('passwordErrorMessage').style.visibility = 'hidden';
        document.getElementById('userPassword').classList.remove('is-danger')
    };



    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, error: false});
        signup({name, email, password})
            .then(data => {
                if (data.error) {
                    setValues({
                        ...values,
                        error: data.error,
                        success: false
                    })
                } else {
                    setValues({
                        ...values,
                        name: '',
                        email: '',
                        password: '',
                        error: '',
                        success: true
                    })
                }
            })
    };

    const showError = () => {
        if (error === "Name is required") {
            document.getElementById('userNameErrorIcon').style.visibility = 'visible';
            document.getElementById('userNameErrorMessage').style.visibility = 'visible';
            document.getElementById('userName').classList.add('is-danger')
        } else if (error === "Email is invalid") {
            document.getElementById('emailErrorIcon').style.visibility = 'visible';
            document.getElementById('emailErrorMessage').style.visibility = 'visible';
            document.getElementById('userEmail').classList.add('is-danger')
        } else if (error === "Password is required" || error === "Password must contain at least 6 characters" || error === "Password must contain a number" || error === "Password must contain a letter") {
            document.getElementById('passwordErrorIcon').style.visibility = 'visible';
            document.getElementById('passwordErrorMessage').style.visibility = 'visible';
            document.getElementById('userPassword').classList.add('is-danger')
        } else if (error === "") {
            
        }
    };

    const showSuccess = () => (
        <div className="has-text-success" style={{display: success ? 'block' : 'none'}}>
            New Account Create Please <NavLink to="/signin" className="has-text-link" style={{textDecoration: 'none'}}>Signin</NavLink>
        </div>
    )


    const signUpForm = () => (
        <form name="myForm" style={{maxWidth: '900px'}}>
            <div className="field">
                <label className="label">Name</label>
                <p className="control is-expanded has-icons-left has-icons-right">
                    <input
                        id='userName'
                        onChange={handleChange('name')}
                        className="input"
                        type="text"
                        placeholder="Name"
                        value={name}
                    />
                    <span className="icon is-small is-left">
          <FontAwesomeIcon icon={faUser}/>
        </span>
                    <span id="userNameErrorIcon" className="icon is-small is-right" style={{visibility: 'hidden'}}>
      <FontAwesomeIcon icon={faExclamationTriangle}/>
    </span>
                </p>
            </div>
            <p id="userNameErrorMessage" className="help is-danger" style={{visibility: 'hidden'}}>{error}</p>
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
                        Submit
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
                {showSuccess()}
                {showError()}
                {signUpForm()}
            </div>
        </Layout>
    );
};

export default Signup;
