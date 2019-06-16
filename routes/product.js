const express = require('express');
const router = express.Router();

const {create, productById, read, list, remove, update} = require('../controllers/product');
const {requireSignin, isAuth, isAdmin} = require('../controllers/auth');
const {userById} = require("../controllers/user");

router.get('/product/:productId', read);
router.post(
    '/product/create/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    create
);

router.delete(
    '/product/:productId/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    remove
);

router.put(
    '/product/:productId/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    update
);

router.param('userId', userById);
router.param('productId', productById);

router.get('/products', list);
// sold / new arrivals
// products sold = /products?sortBy=sold&order=desc&limit=4
// products new arrivals = /products?sortBy=createdAt&order=desc&limit=4
// if no params are sent, then all products are returned

module.exports = router;