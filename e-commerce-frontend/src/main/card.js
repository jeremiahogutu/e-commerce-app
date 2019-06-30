import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import ShowImage from "./ShowImage";

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
    }
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
                    ${product.price}
                </div>
                <div className="button-container is-flex" style={{justifyContent: 'space-between', flexWrap: 'wrap'}}>
                    <Link to={`/product/${product._id}`} >
                        {showViewButton(showViewProductButton)}
                    </Link>
                    <button className="button is-warning is-outlined" style={{marginTop: '10px'}}>Add Product</button>
                </div>
            </div>
        </Fragment>
    );
};

export default Card;
