import React, {useState, useEffect} from 'react';
import Layout from './Layout'
import {getProducts} from "./apiMain";
import Card from "./card";
import Search from "./Search";
import '../App.css'

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
            title="Home"
            description="Node React E-commerce App"
        >
            <Search/>
            <div className="container is-fluid">
                <div className="notification has-background-white">
                    <div className="column">
                        <div className="column is-12-desktop">
                            <h3 className="is-size-4 has-text-weight-bold has-text-black">New Arrivals</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="columns container is-fluid is-flex" style={{flexWrap: 'wrap'}}>
                {productsByArrival.map((product, i) =>
                    (
                        <div key={i} className='column is-3 is-flex' style={{justifyContent: 'center'}}>
                            <div className="card cardSize" style={{marginTop: '25px'}}>
                                <Card product={product}/>
                            </div>
                        </div>
                    ))}
            </div>


            <div className="container is-fluid">
                <div className="notification has-background-white">
                    <div className="column">
                        <div className="column is-12-desktop">
                            <h3 className="is-size-4 has-text-weight-bold has-text-black">Best Sellers</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="columns container is-fluid is-flex" style={{flexWrap: 'wrap'}}>
                {productsBySell.map((product, i) =>
                    (
                        <div key={i} className='column is-3 is-flex' style={{justifyContent: 'center'}}>
                            <div className="card cardSize" style={{marginTop: '25px'}}>
                                <Card  product={product}/>
                            </div>
                        </div>
                    ))}
            </div>

        </Layout>
    )
};

export default Home;
