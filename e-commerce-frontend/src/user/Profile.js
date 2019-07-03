import React, {useState, useEffect} from 'react';
import Layout from "../main/Layout";
import {isAuthenticated} from "../auth";
import {Link, Redirect} from "react-router-dom";
import {read, update, updateUser} from "./ApiUser";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

const Profile = ({match}) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const {token} = isAuthenticated();

    const {name, email, password, error, success} = values;

    const init = (userId) => {
        read(userId, token).then(data => {
            if (data.error) {
                setValues({
                    ...values,
                    error: true
                })
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    email: data.email
                })
            }
        })
    };

    useEffect(() => {
        init(match.params.userId)
    }, []);

    const handleChange = name => e => {
        setValues({
            ...values,
            error: false,
            [name]: e.target.value
        })
    };

    const clickSubmit = e => {
        e.preventDefault();
        update(match.params.userId, token, {name, email, password})
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    updateUser(data, () => {
                        setValues({
                            ...values,
                            name: data.name,
                            email: data.email,
                            success: true
                        })
                    })
                }
            })
    };

    const redirectUser = success => {
        if (success) {
            return <Redirect to="/user/dashboard"/>
        }
    };

    const profileUpdate = (name, email, password) => (
        <form style={{maxWidth: '900px'}}>
            <div className="field" style={{marginTop: '25px'}}>
                <label className='label'>Name</label>
                <p className="control has-icons-left has-icons-right">
                    <input
                        className="input"
                        type="text"
                        onChange={handleChange('name')}
                        placeholder="User Name"
                        value={name}
                        autoFocus
                    />
                    <span className="icon is-small is-left">
      <FontAwesomeIcon icon={faUser}/>
    </span>
                </p>
            </div>
            <div className="field" style={{marginTop: '25px'}}>
                <label className='label'>Email</label>
                <p className="control has-icons-left has-icons-right">
                    <input
                        className="input"
                        type="email"
                        onChange={handleChange('email')}
                        placeholder="User Name"
                        value={email}
                    />
                    <span className="icon is-small is-left">
      <FontAwesomeIcon icon={faEnvelope}/>
    </span>
                </p>
            </div>
            <div className="field" style={{marginTop: '25px'}}>
                <label className='label'>Password</label>
                <p className="control has-icons-left has-icons-right">
                    <input
                        className="input"
                        type="password"
                        onChange={handleChange('password')}
                        placeholder="password"
                        value={password}
                    />
                    <span className="icon is-small is-left">
      <FontAwesomeIcon icon={faLock}/>
    </span>
                </p>
            </div>
            <div className="field" style={{marginTop: '25px'}}>
                <p className="control is-flex" style={{justifyContent: 'space-between', alignItems: 'center'}}>
                    <button onClick={clickSubmit} className="button is-success">
                        Submit
                    </button>
                </p>
            </div>
        </form>
    );

    return (
        <Layout
            title="Profile"
            description="Update your profile"
            className='is-flex'
        >
            {profileUpdate(name, email, password)}
            {redirectUser(success)}
        </Layout>
    )
};

export default Profile;
