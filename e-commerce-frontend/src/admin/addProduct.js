import React, {useState, useEffect} from 'react';
import {isAuthenticated} from "../auth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudUploadAlt, faPlusSquare, faDollarSign} from "@fortawesome/free-solid-svg-icons";
import Layout from "../main/Layout";
import {createProduct} from "./apiAdmin";
import {NavLink} from "react-router-dom";

const AddProduct = () => {

    const {user, token} = isAuthenticated();
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectProfile: false,
        formData: ''
    });

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        photo,
        loading,
        error,
        createdProduct,
        redirectProfile,
        formData
    } = values;

    useEffect(() => {
        setValues({
            ...values,
            formData: new FormData()
        })
    }, []);

    const clickSubmit = (e) => {

    };

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        if (name === 'photo') {
            const productPhoto = document.getElementById('productPhoto');
            if (productPhoto.files && productPhoto.files[0]) {
                const reader = new FileReader();

                reader.onload = function (e) {
                    document.getElementById('productPhotoPreview').src = e.target.result;
                };

                reader.readAsDataURL(productPhoto.files[0]);
            }
        }
        setValues({
            ...values,
            [name]: value
        })
    };

    // const readURL = (photo) => {
    //
    // };

    const newPostForm = () => (
        <form onSubmit={clickSubmit} style={{maxWidth: '900px'}}>
            <div className="field is-flex" style={{justifyContent: 'space-between', alignItems: 'center'}}>
                <figure className="image is-128x128">
                    <img id="productPhotoPreview" src="https://bulma.io/images/placeholders/128x128.png" style={{maxHeight: '128px'}} alt="product"/>
                </figure>
                <div className="file is-primary">
                    <label className="file-label">
                        <input
                            className="file-input"
                            type="file"
                            id="productPhoto"
                            name="photo"
                            accept="image/*"
                            onChange={handleChange('photo')}
                        />
                        <span className="file-cta">
        <span className="file-icon">
            <FontAwesomeIcon icon={faCloudUploadAlt}/>
          <i className="fas fa-cloud-upload-alt"/>
        </span>
        <span className="file-label">
          Upload Photo
        </span>
      </span>
                    </label>
                </div>
            </div>
            <div className="field" style={{marginTop: '25px'}}>
                <p className="control has-icons-left has-icons-right">
                    <input
                        className="input"
                        onChange={handleChange('name')}
                        type="text"
                        placeholder="Product Name"
                        value={name}
                        autoFocus
                    />
                    <span className="icon is-small is-left">
      <FontAwesomeIcon icon={faPlusSquare}/>
    </span>
                </p>
            </div>
            <div className="field" style={{marginTop: '25px'}}>
                <p className="control">
                    <input
                        className="textarea"
                        onChange={handleChange('description')}
                        placeholder="Description"
                        value={description}
                    />
                </p>
            </div>
            <div className="field" style={{marginTop: '25px'}}>
                <p className="control has-icons-left">
                    <input
                        className="input"
                        onChange={handleChange('price')}
                        type="number"
                        placeholder="Price"
                        value={price}
                    />
                    <span className="icon is-small is-left">
      <FontAwesomeIcon icon={faDollarSign}/>
    </span>
                </p>
            </div>
            <div className="field">
                <label className="label">Category</label>
                <div className="control">
                    <div className="select">
                        <select onChange={handleChange('category')}>
                            <option value="5d02e6a455092e25d7faf084">Node</option>
                            <option value="5d058cd663b50a39855e090b">Python</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="field" style={{marginTop: '25px'}}>
                <p className="control has-icons-left">
                    <input
                        className="input"
                        onChange={handleChange('quantity')}
                        type="number"
                        placeholder="Quantity"
                        value={quantity}
                    />
                    <span className="icon is-small is-left">
      <FontAwesomeIcon icon={faPlusSquare}/>
    </span>
                </p>
            </div>
            <div className="field">
                <label className="label">Shipping</label>
                <div className="control">
                    <div className="select">
                        <select onChange={handleChange('shipping')}>
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="field" style={{marginTop: '25px'}}>
                <p className="control">
                    <button className="button is-success">
                        Create Product
                    </button>
                </p>
            </div>
        </form>
    );

    return (
        <Layout
            title="Add a new product"
            description={`Hey ${user.name}!`}
            className="is-flex"
        >
            <div className="notification has-background-white">
                {/*{JSON.stringify(values)}*/}
                {newPostForm()}
            </div>
        </Layout>
    );
};

export default AddProduct