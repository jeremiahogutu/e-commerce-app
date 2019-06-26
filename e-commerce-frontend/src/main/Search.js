import React, {useState, useEffect} from 'react';
import {getCategories} from "./apiMain";

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    });

    const { categories, category, search, results, searched } = data;

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
    
    return (
        <div className="column">
            <div className="column is-11-desktop is-offset-1-desktop">
                <h3 className="is-size-4 has-text-weight-bold has-text-black">Search Bar {JSON.stringify(categories)}</h3>
            </div>
        </div>
    );
};

export default Search;
