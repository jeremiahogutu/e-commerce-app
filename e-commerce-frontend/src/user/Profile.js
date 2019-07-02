import React, {useState, useEffect} from 'react';
import Layout from "../main/Layout";
import {isAuthenticated} from "../auth";
import {Link} from "react-router-dom";
import {read, update, updateUser} from "./ApiUser";

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
    });

    return (
        <Layout
            title="Profile"
            description="Update your profile"
        >
            <h2>Profile Update</h2>
            {JSON.stringify(values)}
        </Layout>
    )
};

export default Profile;
