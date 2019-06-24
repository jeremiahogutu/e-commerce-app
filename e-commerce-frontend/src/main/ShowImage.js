import React from 'react';
import {API} from "../config";

const ShowImage = ({item, url}) => {
    return (
        <div className="product-img">
            <img src={`${API}/${url}/photo/${item._id}`} alt={item.name} style={{maxHeight: '100%', maxWidth: '100%'}}/>
        </div>
    );
};

export default ShowImage;
