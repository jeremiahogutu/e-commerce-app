import React, {useState, useEffect} from 'react';
import Layout from "./Layout";
import {read} from "./apiMain";
import Card from "./card";

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
            title={product && product.name}
            description={
                product &&
                product.description &&
                product.description.substring(0, 100)
            }
        >
            <div>{product && product.description &&
            <div className='column is-12 is-flex'>
                <div className="card" style={{width: '480px', marginTop: '25px'}}>
                    <Card product={product} showViewProductButton={false}/>
                </div>
            </div> }</div>
        </Layout>
    );
};

export default Product;
