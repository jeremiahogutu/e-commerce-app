import React, {useState} from 'react';
import {isAuthenticated} from "../auth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import Layout from "../main/Layout";

const AddCategory = () => {
    // const [name, setName] = useState('');
    // const [error, setError] = useState('');
    // const [success, setSuccess] = useState('');

    const [values, setValues] = useState({
        name: '',
        error: 'false',
        success: 'false'
    });

    const {name} = values;

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
        })
        // make request to api to create category

    };

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit} style={{maxWidth: '900px'}}>
            <div className="field">
                <p className="control has-icons-left has-icons-right">
                    <input
                        className="input"
                        onChange={handleChange}
                        type="text"
                        placeholder="New Category"
                        value={name}
                        autoFocus
                    />


                    <span className="icon is-small is-left">
      <FontAwesomeIcon icon={faPlusSquare}/>
    </span>
                </p>
            </div>
            <div className="field">
                <p className="control">
                    <button className="button is-success">
                        Create Category
                    </button>
                </p>
            </div>
        </form>
    );
    return (
        <Layout
            title="Dashboard"
            description={`Hey ${name}!`}
            className="is-flex"
        >
            <div className="notification has-background-white">
                {newCategoryForm()}
            </div>
        </Layout>
    );
};

export default AddCategory;
