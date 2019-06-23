import React, {useState, useEffect} from 'react';
import Layout from './Layout'
import {getProducts} from "./apiMain";

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    // const {productsBySell, productsByArrival, error} = values;

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductsBySell(data)
            }
        })
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {

            if (data.error) {
              setError(data.error)
            } else {
                setProductsByArrival(data)
            }
        })
    };

    useEffect(() => {
       loadProductsByArrival();
        loadProductsBySell()
    }, []);

    return (
        <Layout
            title="Home Page"
            description="Node React E-commerce App"
        >
            {JSON.stringify(productsByArrival)}
            <div className="has-background-danger">yolo</div>
            {JSON.stringify(productsBySell)}

        </Layout>
    )
};

export default Home;
