import React, {useState, useEffect} from 'react';
import {isAuthenticated} from "../auth";
import Layout from "../main/Layout";
import {Link} from "react-router-dom";
import {getProducts, deleteProduct} from "./apiAdmin";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    const {user, token} = isAuthenticated();

    const loadProducts = () => {
        getProducts()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setProducts(data)
                }
            })
    };

    const destroy = productId => {
        deleteProduct(productId, user._id, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    loadProducts()
                }
            })
    };

    useEffect(() => {
        loadProducts()
    }, []);


    return (
        <Layout
            title="Manage comic books"
            description="Perform Crud on comic books"
            // className="is-flex"
        >
            <h2 className='is-size-4 has-text-weight-bold has-text-black has-text-centered' style={{marginTop: '25px'}}>Total {products.length} products</h2>
            <div className="list" style={{maxWidth: '600px', flexGrow: 1, margin: '25px auto 0'}}>
                {products.map((product, i) => (
                    <li
                        key={i}
                        className="list-item has-background-white is-flex"
                        style={{flexDirection: 'column'}}
                    >
                        <strong className='has-text-centered'>{product.name}</strong>
                        <div className='buttonContainer' style={{display: 'flex', justifyContent: 'space-around'}}>
                            <Link to={`/admin/update/product/${product._id}`}>
                            <span className="button is-primary is-rounded">
                                Update
                            </span>
                            </Link>
                            <span onClick={() => destroy(product._id)} className="button is-danger is-rounded">
                                Delete
                            </span>
                        </div>
                    </li>
                ))}

            </div>
        </Layout>
    );
};

export default ManageProducts;
