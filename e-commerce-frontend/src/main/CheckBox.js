import React, {useState, useEffect} from 'react';

const CheckBox = ({categories}) => {

    const [checked, setChecked] = useState([]);

    const handleToggle = categoryId => () => {
        // return the first index or -1
        const currentCategoryId = checked.indexOf(categoryId);
        const newCheckedCategoryId = [...checked];

        // if currently checked was not already in checked state then we push else we pull and remove
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(categoryId)
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1)
        }

        console.log(newCheckedCategoryId);
        setChecked(newCheckedCategoryId)
    };

    return categories.map((category, i) => (
        <li key={i}>
            <label className="checkbox">
                <input
                    onChange={handleToggle(category._id)}
                    type="checkbox"
                    value={checked.indexOf(category._id === 1)}
                />
                {category.name}
            </label>
        </li>

    ))
};

export default CheckBox;
