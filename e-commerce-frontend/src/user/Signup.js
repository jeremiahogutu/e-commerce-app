import React, {useState} from 'react';
import Layout from "../main/Layout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faUser, faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {API} from "../config";

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const {name, email, password} = values;

    const handleChange = userInput => event => {
        setValues({...values, error: false, [userInput]: event.target.value })
    };

    const signup = user => {
        fetch(`${API}/signup`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                return response.json()
            })
            .catch(err => {
                console.log(err)
            })
    };

    const clickSubmit = event => {
        event.preventDefault();
        signup({name, email, password})
    };



    const signUpForm = () => (
        <form style={{maxWidth: '900px'}}>
            <div className="field">
                <label className="label">Name</label>
                <p className="control is-expanded has-icons-left">
                    <input onChange={handleChange('name')} className="input" type="text" placeholder="Name"/>
                    <span className="icon is-small is-left">
          <FontAwesomeIcon icon={faUser}/>
        </span>
                </p>
            </div>
            <div className="field">
                <label className="label">Email</label>
                <p className="control has-icons-left has-icons-right">
                    <input onChange={handleChange('email')} className="input" type="email" placeholder="Email"/>
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
                    <input onChange={handleChange('password')} className="input" type="password" placeholder="Password"/>
                    <span className="icon is-small is-left">
      <FontAwesomeIcon icon={faLock}/>
    </span>
                </p>
            </div>
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
                {signUpForm()}
                {JSON.stringify(values)}
            </div>
        </Layout>
    );
};

export default Signup;
