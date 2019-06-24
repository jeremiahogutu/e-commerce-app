import React, {useState, useEffect, Fragment} from 'react';

const RadioBox = ({prices, handleFilters}) => {
    const [value, setValue] = useState(0);

    const handleChange = (event) => {
        handleFilters(event.target.value);
        setValue(event.target.value)
    };

    return prices.map((price, i) => (
        <div key={i} className='control'>
            <label className="checkbox">
                <input
                    onChange={handleChange}
                    type="radio"
                    value={`${price._id}`}
                    name={price}
                />
                {price.name}
            </label>
        </div>

    ))
};

export default RadioBox;
