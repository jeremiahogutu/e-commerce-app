import React, {Fragment} from 'react';
import {NavLink, withRouter} from "react-router-dom";
import {signout, isAuthenticated} from "../auth";
import shoppingLogo from '../assets/cart.svg'
import '../App.css'

const Menu = () => {
    document.addEventListener('DOMContentLoaded', () => {

        // Get all "navbar-burger" elements
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

        // Check if there are any navbar burgers
        if ($navbarBurgers.length > 0) {

            // Add a click event on each of them
            $navbarBurgers.forEach(el => {
                el.addEventListener('click', () => {

                    // Get the target from the "data-target" attribute
                    const target = el.dataset.target;
                    const $target = document.getElementById(target);

                    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                    el.classList.toggle('is-active');
                    $target.classList.toggle('is-active');

                });
            });
        }

    });

    const openNav = () => {
        document.getElementById("mySidenav").style.width = "250px";
    };

    const closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
    };

    return (
        <nav className="navbar is-link is-fixed-top">
            <div id="mySidenav" className="sidenav">
                <span className="closebtn" onClick={closeNav}>&times;</span>
                <aside className="menu">
                    <p className="menu-label">
                        E-Commerce
                    </p>
                    <ul className="menu-list">
                        <li>
                            <NavLink to="/" onClick={closeNav} activeStyle={{color: '#ff9900'}}
                                     exact={true}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/shop" onClick={closeNav} activeStyle={{color: '#ff9900'}}
                                     exact={true}>
                                Shop
                            </NavLink>
                        </li>
                        {isAuthenticated() && isAuthenticated().user.role === 0 && (
                            <li>
                                <NavLink to="/user/dashboard" onClick={closeNav} activeStyle={{color: '#ff9900'}}
                                         exact={true}>
                                    Dashboard
                                </NavLink>
                            </li>
                        )}
                        {isAuthenticated() && isAuthenticated().user.role === 1 && (
                            <li>
                                <NavLink to="/admin/dashboard" onClick={closeNav} activeStyle={{color: '#ff9900'}}
                                         exact={true}>
                                    Dashboard
                                </NavLink>
                            </li>
                        )}
                        {!isAuthenticated() && (
                            <Fragment>
                                <li>
                                    <NavLink
                                        to="/signin"
                                        onClick={closeNav}
                                        activeStyle={{color: '#ff9900'}}>
                                        SignIn
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/signup"
                                        onClick={closeNav}
                                        activeStyle={{color: '#ff9900'}}>
                                        SignUp
                                    </NavLink>
                                </li>
                            </Fragment>
                        )}
                        {isAuthenticated() && (
                            <li>
                                <NavLink
                                    to="/signout"
                                    onClick={() => signout(() => {
                                        window.location.href = "/"
                                    })}
                                    activeStyle={{
                                        color: '#ff9900'
                                    }}>Signout
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </aside>
            </div>
            <div className="navbar-brand">
                <span style={{fontSize: '30px', cursor: 'pointer', marginLeft: '10px'}} onClick={openNav}>&#9776;</span>
                <NavLink className="navbar-item" to="/">
                    <img src={shoppingLogo}
                         alt="shopping logo" width="112" height="28"/>
                </NavLink>
            </div>
            <div id="e-commerce-nav" className="navbar-menu">
                <div className="navbar-start">
                    <NavLink className="navbar-item" to="/" activeStyle={{color: '#ff9900'}} exact={true}>
                        Home
                    </NavLink>
                    <NavLink className="navbar-item" to="/shop" activeStyle={{color: '#ff9900'}} exact={true}>
                        Shop
                    </NavLink>
                    {isAuthenticated() && isAuthenticated().user.role === 0 && (
                        <NavLink className="navbar-item" to="/user/dashboard" activeStyle={{color: '#ff9900'}}
                                 exact={true}>
                            Dashboard
                        </NavLink>
                    )}
                    {isAuthenticated() && isAuthenticated().user.role === 1 && (
                        <NavLink className="navbar-item" to="/admin/dashboard" activeStyle={{color: '#ff9900'}}
                                 exact={true}>
                            Dashboard
                        </NavLink>
                    )}
                    {!isAuthenticated() && (
                        <Fragment>
                            <NavLink className="navbar-item" to="/signup" activeStyle={{color: '#ff9900'}}>
                                Sign up
                            </NavLink>
                            <NavLink className="navbar-item" to="/signin" activeStyle={{color: '#ff9900'}}>
                                Sign in
                            </NavLink>
                        </Fragment>
                    )}
                </div>

                <div className="navbar-end">
                    {isAuthenticated() && (
                        <Fragment>
                            <NavLink
                                className="navbar-item"
                                style={{marginRight: '25px'}}
                                to="/signout"
                                onClick={() => signout(() => {
                                    window.location.href = "/"
                                })}
                                activeStyle={{
                                    color: '#ff9900'
                                }}>
                                Signout
                            </NavLink>
                        </Fragment>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default withRouter(Menu);
