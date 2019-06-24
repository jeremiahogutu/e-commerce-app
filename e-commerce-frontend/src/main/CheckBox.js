import React from 'react';

const CheckBox = ({categories}) => {
    return categories.map((category, i) => (
        <li key={i}>
            <label className="checkbox">
                <input type="checkbox"/>
                {category.name}
            </label>
        </li>

    ))
};

export default CheckBox;
