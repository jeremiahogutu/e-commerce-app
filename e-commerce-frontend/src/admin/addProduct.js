import React, {useState, useEffect} from 'react';
import {isAuthenticated} from "../auth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import Layout from "../main/Layout";
import {createProduct} from "./apiAdmin";
import {NavLink} from "react-router-dom";

const AddProduct = () => {

    const {user, token} = isAuthenticated();

    return (
        <Layout
            title="Add a new product"
            description={`Hey ${user.name}!`}
            className="is-flex"
        >
            <div className="notification has-background-white">
                {/*{JSON.stringify(values)}*/}
                ...
            </div>
        </Layout>
    );
}

export default AddProduct