import React, {useState, useEffect} from 'react';
import Layout from "./Layout";
import Card from "./card";
import {getCategories} from "../admin/apiAdmin";
import CheckBox from "./CheckBox";
import RadioBox from "./RadioBox";
import {prices} from "./FixedPrices";
import {getFilteredProducts} from "./apiMain";
import '../App.css'

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: {
            category: [],
            price: []
        }
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(8);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

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

    const loadFilterResults = newFilters => {
        // console.log(newFilters)
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0)
            }
        })
    };

    const loadMore = () => {
        let toSkip = skip + limit;
        // console.log(newFilters)
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip)
            }
        })
    };

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore} className="button is-warning">Load More</button>
            )
        )
    };


    useEffect(() => {
        init();
        loadFilterResults(skip, limit, myFilters.filters)
    }, []);

    const handleFilters = (filters, filterBy) => {
        // console.log('Shop', filters, filterBy)
        const newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }

        loadFilterResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let priceArray = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                priceArray = data[key].array
            }
        }
        return priceArray;
    };

    return (
        <Layout
            title="Shop"
            description="Search and find comic books of your choice"
        >

            <div className="container is-fluid">
                <div className="columns is-marginless">
                    <div className="column" id='shop-filters' style={{paddingLeft: '32px'}}>
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
                    <div className="column is-three-quarters-desktop is-full-mobile">
                        <h3 className="is-size-4 has-text-weight-bold has-text-black has-text-centered">Comic Books</h3>
                        <div className="columns container is-fluid is-flex" style={{flexWrap: 'wrap'}}>
                            {filteredResults.map((product, i) =>
                                (
                                    <div key={i} className='column is-4-desktop is-6-tablet is-flex is-paddingless' style={{justifyContent: 'center'}}>
                                        <div className="card cardSize" style={{marginTop: '25px'}}>
                                            <Card
                                                  product={product}/>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <hr/>
                        {loadMoreButton()}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Shop;
