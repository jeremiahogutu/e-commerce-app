import React, {useState, useEffect} from 'react';
import Layout from "./Layout";
import Card from "./card";
import {getCategories} from "../admin/apiAdmin";

const Shop = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState([]);

    // load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setCategories(data)
            }
        })
    };

    useEffect(() => {
        init()
    }, []);


    return (
        <Layout
            title="Home Page"
            description="Node React E-commerce App"
        >
            {JSON.stringify(categories)}
        </Layout>
    );
};

export default Shop;
