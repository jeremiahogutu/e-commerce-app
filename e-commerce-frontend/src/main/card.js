import React, {Fragment, useState} from 'react';
import {Link} from "react-router-dom";
import ShowImage from "./ShowImage";
import {addItem} from "./cartHelpers";
import {Redirect} from "react-router-dom";
import moment from 'moment'

const Card = ({product, showViewProductButton = true, showAddToCartButton = true}) => {

    const [redirect, setRedirect] = useState(false);

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

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true)
        })
    };

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to={"/cart"}/>
        }
    };

    const showCartButton = showAddToCartButton => {
        return (
            showAddToCartButton && (<button onClick={addToCart} className="button is-warning is-outlined" style={{marginTop: '10px'}}>Add To Cart</button>)
        )
    };

    const showStock = (quantity) => {
        return quantity > 0 ? <span className="button is-primary is-rounded">In Stock</span> : <span className="button is-primary is-rounded">Out of Stock</span>
    };

    return (
        <Fragment>
            {shouldRedirect(redirect)}
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
                    {showCartButton(showAddToCartButton)}
                </div>
            </div>
        </Fragment>
    );
};

export default Card;
