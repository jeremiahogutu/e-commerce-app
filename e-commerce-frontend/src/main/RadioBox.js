import React, {useState, useEffect, Fragment} from 'react';

const RadioBox = ({prices}) => {
    const [value, setValue] = useState(0);

    const handleChange = () => {

    }

    return prices.map((price, i) => (
        <div key={i} className='control'>
            <label className="checkbox">
                <input
                    onChange={handleChange}
                    type="radio"
                    value={`${price._id}`}
                />
                {price.name}
            </label>
        </div>

    ))
};

export default RadioBox;
