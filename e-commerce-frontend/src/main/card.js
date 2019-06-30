import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from 'moment'

const Card = ({product, showViewProductButton = true}) => {

    const showViewButton = showViewProductButton => {
        return (
            showViewProductButton && (
                <button className="button is-primary is-outlined"
                    style={{marginTop: '10px'}}>
                    View Product
                </button>
            )
        )
    };

    const showAddToCartButton = () => {
        return (
            <button className="button is-warning is-outlined" style={{marginTop: '10px'}}>Add Product</button>
        )
    };

    const showStock = (quantity) => {
        return quantity > 0 ? <span className="button is-primary is-rounded">In Stock</span> : <span className="button is-primary is-rounded">Out of Stock</span>
    };

    return (
        <Fragment>
            <div className="card-image">
                <ShowImage item={product} url="product"/>
            </div>
            <div className="card-content" style={{padding: '0.7em'}}>
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4 is-capitalized">{product.name}</p>
                        <p className="subtitle is-6">{product.description.substring(0, 100)}</p>
                    </div>
                </div>
                <div className="content">
                    <p>${product.price}</p>
                    <p>Category: {product.category && product.category.name}</p>
                    <p>Added on: {moment(product.createdAt).fromNow()}</p>
                </div>
                {showStock(product.quantity)}
                <div className="button-container is-flex" style={{justifyContent: 'space-between', flexWrap: 'wrap'}}>
                    <Link to={`/product/${product._id}`} >
                        {showViewButton(showViewProductButton)}
                    </Link>
                    {showAddToCartButton()}
                </div>
            </div>
        </Fragment>
    );
};

export default Card;
