import React, {useState, useEffect} from 'react';
import Layout from './Layout'
import {getProducts} from "./apiMain";
import Card from "./card";

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

            <div className="column">
                <div className="column is-11-desktop is-offset-1-desktop">
                    <h3 className="is-size-4 has-text-weight-bold has-text-black">New Arrivals</h3>
                </div>
            </div>

            <div className="columns container is-fluid is-flex" style={{flexWrap: 'wrap'}}>
                {productsByArrival.map((product, i) =>
                    (<Card key={i} product={product}/>
                    ))}
            </div>


            <div className="column">
                <div className="column is-11-desktop is-offset-1-desktop">
                    <h3 className="is-size-4 has-text-weight-bold has-text-black">Best Sellers</h3>
                </div>
            </div>
            <div className="columns container is-fluid is-flex" style={{flexWrap: 'wrap'}}>
                {productsBySell.map((product, i) =>
                    (<Card key={i} product={product}/>
                    ))}
            </div>

        </Layout>
    )
};

export default Home;
