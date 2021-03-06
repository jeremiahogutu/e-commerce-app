import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './main/Home'
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./user/UserDashboard";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/addProduct";
import Shop from "./main/Shop";
import Product from "./main/Product";
import Cart from "./main/Cart"
import Orders from "./admin/Orders";
import Profile from "./user/Profile";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/shop" exact component={Shop}/>
                <Route path="/signin" exact component={Signin}/>
                <Route path="/signup" exact component={Signup}/>
                <PrivateRoute path="/user/dashboard" exact component={Dashboard}/>
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
                <AdminRoute path="/create/category" exact component={AddCategory}/>
                <AdminRoute path="/create/product" exact component={AddProduct}/>
                <AdminRoute path="/admin/orders" exact component={Orders}/>
                <Route path="/product/:productId" exact component={Product}/>
                <Route path="/cart" exact component={Cart}/>
                <PrivateRoute path="/profile/:userId" exact component={Profile}/>
                <AdminRoute path="/admin/products" exact component={ManageProducts}/>
                <AdminRoute
                    path="/admin/update/product/:productId"
                    exact
                    component={UpdateProduct}
                />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
