import React, {useState, useEffect} from 'react';
import Layout from "./Layout";
import {read, listRelated} from "./apiMain";
import Card from "./card";

const Product = (props) => {
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProduct(data);
                // fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error)
                    } else {
                        setRelatedProduct(data)
                    }
                })
            }
        })
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId)
    }, [props]);

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
            <div className='columns is-marginless'>
                <div className="column is-three-quarters-desktop">
                    <div className="card" style={{maxWidth: '600px', margin: '60px auto 0'}}>
                        <Card product={product} showViewProductButton={false} preview={false}/>
                    </div>
                </div>
                <div className="column is-one-quarter-desktop">
                    <h4 className="is-size-4 has-text-weight-bold has-text-black">Related Products</h4>
                    {relatedProduct.map((product, i) => (
                        <div className="card" style={{width: '300px', marginTop: '25px'}}>
                            <Card key={i} product={product}/>
                        </div>
                    ))}
                </div>
            </div>}</div>
        </Layout>
    );
};

export default Product;
