import React, {useState, useEffect} from 'react';
import {getCategories, list} from "./apiMain";

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
                                            {categories.map((category, i) => (<option key={i} value={category._id}>{category.name}</option>))}
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
            <div className="column is-11-desktop is-offset-1-desktop is-flex" style={{justifyContent: 'center'}}>
                <h3 className="is-size-4 has-text-weight-bold has-text-black">{searchForm()} {JSON.stringify(results)}</h3>
            </div>
        </div>
    );
};

export default Search;
