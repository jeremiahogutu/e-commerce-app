import React from 'react';
import ShowImage from "./ShowImage";

const Card = ({product}) => {
    return (
        <div className='column is-4 is-flex' style={{justifyContent: 'center'}}>
            <div className="card" style={{width: '300px', marginTop: '25px'}}>
                <div className="card-image">
                    {/*<figure className="image is-4by3">*/}
                    {/*    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"/>*/}
                    {/*</figure>*/}
                    <ShowImage item={product} url="product"/>
                </div>
                <div className="card-content" style={{padding: '0.7em'}}>
                    <div className="media">
                        <div className="media-content">
                            <p className="title is-4">{product.name}</p>
                            <p className="subtitle is-6">{product.description}</p>
                        </div>
                    </div>

                    <div className="content">
                        ${product.price}
                    </div>
                    <div className="button-container is-flex" style={{justifyContent: 'space-between', flexWrap: 'wrap'}}>
                        <button className="button is-primary is-outlined" style={{marginTop: '10px'}}>View Product</button>
                        <button className="button is-warning is-outlined" style={{marginTop: '10px'}}>Add Product</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
