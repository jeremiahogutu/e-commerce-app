import React, {useState, useEffect} from 'react';
import Layout from "./Layout";
import Card from "./card";
import {getCategories} from "../admin/apiAdmin";
import CheckBox from "./CheckBox";
import RadioBox from "./RadioBox";
import {prices} from "./FixedPrices";

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
        // console.log('Shop', filters, filterBy)
        const newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }

        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for(let key in data) {
            if(data[key]._id === parseInt(value)) {
                array = data[key].array
            }
        }
        return array;
    };

    return (
        <Layout
            title="Shop"
            description="Search and find books of your choice"
        >

            <div className="container is-fluid">
                <div className="notification has-background-white">
                    <div className="columns">
                        <div className="column">
                            <h4 className="is-size-4 has-text-weight-semibold has-text-black">Filter by categories</h4>
                            <ul>
                                <CheckBox
                                    categories={categories}
                                    handleFilters={filters => handleFilters(filters, 'category')}
                                />
                            </ul>
                            <h4 className="is-size-4 has-text-weight-semibold has-text-black">Filter by price range</h4>
                            <div>
                                <RadioBox
                                    prices={prices}
                                    handleFilters={filters => handleFilters(filters, 'price')}
                                />
                            </div>
                        </div>
                        <div className="column is-three-quarters">{JSON.stringify(myFilters)}</div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Shop;
