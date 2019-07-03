import React from 'react';
import {isAuthenticated} from "../auth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import Layout from "../main/Layout";
import {createCategory} from "./apiAdmin";
import {NavLink} from "react-router-dom";
import Search from "../main/Search";
import Card from "../main/card";

const ManageProducts = () => {
    return (
        <Layout
            title="Manage comic books"
            description="Perform Crud on comic books"
        >
            <div>...</div>
        </Layout>
    );
};

export default ManageProducts;
