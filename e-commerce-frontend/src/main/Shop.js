import React, {useState, useEffect} from 'react';
import Layout from "./Layout";
import Card from "./card";
import {getCategories} from "../admin/apiAdmin";
import CheckBox from "./CheckBox";

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: {
            category: [],
            price: []
        }
    });
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


    const handleFilters = (filters, filterBy) => {
        const newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters;
        setMyFilters(newFilters);

        // console.log('Shop', filters, filterBy)
    };

    return (
        <Layout
            title="Home Page"
            description="Node React E-commerce App"
        >

            <div className="container is-fluid">
                <div className="notification has-background-white">
                    <div className="columns">
                        <div className="column">
                            <h4 className="is-size-4 has-text-weight-semibold has-text-black">Filter by categories</h4>
                            <ul>
                                <CheckBox categories={categories} handleFilters={filters => handleFilters(filters, 'category')}/>
                            </ul>
                        </div>
                        <div className="column is-three-quarters">{JSON.stringify(myFilters)}</div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Shop;
