import React, {useState} from 'react';
import {isAuthenticated} from "../auth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import Layout from "../main/Layout";
import {createCategory} from "./apiAdmin";
import {NavLink} from "react-router-dom";

const AddCategory = () => {
    // const [name, setName] = useState('');
    // const [error, setError] = useState('');
    // const [success, setSuccess] = useState('');

    const [values, setValues] = useState({
        name: '',
        error: '',
        success: false
    });

    const {name, success, error} = values;

    // destructure user and token from localstorage
    const {user, token} = isAuthenticated();

    const handleChange = (e) => {
        setValues({
            ...values,
            error: '',
            name: e.target.value
        })
    };

    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({
            ...values,
            error: '',
            success: false
        });
        // make request to api to create category
        createCategory(user._id, token, {name})
            .then(data => {
                if (data.error) {
                    setValues({
                        ...values,
                        error: true,
                        success: false
                    })
                } else {
                    setValues({
                        ...values,
                        error: '',
                        success: true
                    })
                }
            })
    };

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit} style={{maxWidth: '900px'}}>
            <div className="field" style={{marginTop: '25px'}}>
                <p className="control has-icons-left has-icons-right">
                    <input
                        className="input"
                        onChange={handleChange}
                        type="text"
                        placeholder="New Category"
                        value={name}
                        autoFocus
                        required
                    />
                    <span className="icon is-small is-left">
      <FontAwesomeIcon icon={faPlusSquare}/>
    </span>
                </p>
            </div>
            <div className="field" style={{marginTop: '25px'}}>
                <p className="control">
                    <button className="button is-success">
                        Create Category
                    </button>
                </p>
            </div>
        </form>
    );

    const showSuccess = () => {
        if (success) {
            return <h3 className="has-text-success" style={{marginBottom: '0.25rem'}}>{name} category has been created</h3>
        }
    };

    const showError = () => {
        if (error) {
            return <h3 className="has-text-danger" style={{marginBottom: '0.25rem'}}>Category should be unique</h3>
        }
    };

    const goBack = () => (
        <div style={{marginTop: '25px'}}>
            <NavLink to="/admin/dashboard" className="has-text-warning">Back to Dashboard</NavLink>
        </div>
    );

    return (
        <Layout
            title="Add a new category"
            description={`Hey ${user.name}!`}
            className="is-flex"
        >
            <div className="notification has-background-white">
                {showSuccess()}
                {showError()}
                {newCategoryForm()}
                {goBack()}
                {/*{JSON.stringify(values)}*/}
            </div>
        </Layout>
    );
};

export default AddCategory;
