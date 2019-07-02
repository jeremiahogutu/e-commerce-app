import React, {useState, useEffect} from 'react';
import Layout from "../main/Layout";
import {isAuthenticated} from "../auth";
import {Link} from "react-router-dom";
import {read, update, updateUser} from "./ApiUser";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudUploadAlt, faDollarSign, faPlusSquare} from "@fortawesome/free-solid-svg-icons";

const Profile = ({match}) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const {token} = isAuthenticated()

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

    const profileUpdate = (name, email, password) => (
        <form style={{maxWidth: '900px'}}>
            <div className="field" style={{marginTop: '25px'}}>
                <p className="control has-icons-left has-icons-right">
                    <input
                        className="input"
                        type="text"
                        placeholder="User Name"
                        value={name}
                        autoFocus
                    />
                    <span className="icon is-small is-left">
      <FontAwesomeIcon icon={faPlusSquare}/>
    </span>
                </p>
            </div>
            <div className="field" style={{marginTop: '25px'}}>
                <p className="control">
                    <textarea
                        className="textarea"
                        placeholder="Description"
                        value=''
                    />
                </p>
            </div>
            <div className="field" style={{marginTop: '25px'}}>
                <p className="control has-icons-left">
                    <input
                        className="input"
                        type="number"
                        placeholder="Price"
                        value=''
                    />
                    <span className="icon is-small is-left">
      <FontAwesomeIcon icon={faDollarSign}/>
    </span>
                </p>
            </div>
            <div className="field" style={{marginTop: '25px'}}>
                <p className="control has-icons-left">
                    <input
                        className="input"
                        type="number"
                        placeholder="Quantity"
                        value=''
                    />
                    <span className="icon is-small is-left">
      <FontAwesomeIcon icon={faPlusSquare}/>
    </span>
                </p>
            </div>
            <div className="field" style={{marginTop: '25px'}}>
                <p className="control is-flex" style={{justifyContent: 'space-between', alignItems: 'center'}}>
                    <button className="button is-success">
                        Update User
                    </button>
                </p>

            </div>
        </form>
    )

    return (
        <Layout
            title="Profile"
            description="Update your profile"
            className='is-flex'
        >
            {profileUpdate(name, email, password)}
        </Layout>
    )
};

export default Profile;
