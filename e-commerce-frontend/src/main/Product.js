import React, {useState, useEffect} from 'react';
import Layout from "./Layout";
import {read} from "./apiMain";

const Product = (props) => {
    const [product, setProduct] = useState({});

    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProduct(data)
            }
        })
    };

    useEffect(() => {
        const productId = props.match.params.productId
        loadSingleProduct(productId)
    }, []);

    return (
        <Layout
            title="Home"
            description="Node React E-commerce App"
        >
            <h2>Single Product</h2>
            <div>{JSON.stringify(product)}</div>
        </Layout>
    );
};

export default Product;
