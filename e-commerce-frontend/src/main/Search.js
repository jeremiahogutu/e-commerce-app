import React, {useState, useEffect, Fragment} from 'react';
import {getCategories, list} from "./apiMain";
import Card from "./card";
import Layout from "./Layout";

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    });

    const {categories, category, search, results, searched} = data;

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setData({...data, categories: data})
            }
        })
    };

    useEffect(() => {
        loadCategories()
    }, []);

    const searchData = () => {
        if (search) {
            list({
                search: search || undefined,
                category: category
            }).then(response => {
                if (response.error) {
                    console.log(response.error)
                } else {
                    setData({
                        ...data,
                        results: response,
                        searched: true
                    })
                }
            })
        }
    };

    const searchSubmit = (e) => {
        e.preventDefault();
        searchData()
    };

    const handleChange = name => event => {
        setData({
            ...data,
            [name]: event.target.value,
            searched: false
        })
    };

    const searchMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return `Found ${results.length} products`
        }
        if (searched && results.length < 1) {
            return `No products found`
        }
    }

    const searchedProducts = (results = []) => {
        return (
            <Fragment>
                <div className="container is-fluid">
                    <div className="notification has-background-white">
                        <div className="column">
                            <div className="column is-12-desktop">
                                <h3 className="is-size-4 has-text-weight-bold has-text-black">{searchMessage(searched, results)}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="columns container is-fluid is-flex" style={{flexWrap: 'wrap'}}>

                    {results.map((product, i) => (
                        <div className='column is-3 is-flex' style={{justifyContent: 'center'}}>
                            <div className="card" style={{width: '350px', marginTop: '25px'}}>
                                <Card key={i} product={product}/>
                            </div>
                        </div>
                    ))}
                </div>
            </Fragment>
        )
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <div className="field is-grouped" style={{flexWrap: 'wrap'}}>
                <div className="field is-horizontal">
                    <div className="field-body">
                        <div className="field is-expanded">
                            <div className="field has-addons">
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select onChange={handleChange("category")}>
                                            <option value="All">Pick Category</option>
                                            {categories.map((category, i) => (
                                                <option key={i} value={category._id}>{category.name}</option>))}
                                            <option>Sales</option>
                                        </select>
                                    </div>
                                </div>
                                <p className="control is-expanded">
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="search by name"
                                        onChange={handleChange('search')}
                                    />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="control" style={{marginLeft: '10px'}}>
                    <button className="button is-primary">
                        Search
                    </button>
                </p>
            </div>
        </form>
    );

    return (
        <div className="column">
            <div className="is-flex" style={{justifyContent: 'center'}}>
                <h3 className="is-size-4 has-text-weight-bold has-text-black"
                    style={{paddingTop: '25px'}}>{searchForm()}</h3>
            </div>
            <div>
                {searchedProducts(results)}
            </div>
        </div>
    );
};

export default Search;
