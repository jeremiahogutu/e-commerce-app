import React from 'react';
import {NavLink, withRouter} from "react-router-dom";
import shoppingLogo from '../assets/cart.svg'
const Menu = () => {
    document.addEventListener('DOMContentLoaded', () => {

        // Get all "navbar-burger" elements
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

        // Check if there are any navbar burgers
        if ($navbarBurgers.length > 0) {

            // Add a click event on each of them
            $navbarBurgers.forEach( el => {
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

    const closeDrawer = () => {
        const sideNav = document.querySelector('.navbar-menu');
        sideNav.classList.toggle('is-active');
    };
    return (
        <nav className="navbar is-link is-fixed-top">
            <div className="navbar-brand">
                <NavLink className="navbar-item" to="/">
                    <img src={shoppingLogo}
                         alt="shopping logo" width="112" height="28"/>
                </NavLink>
                <div className="navbar-burger burger" data-target="e-commerce-nav">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div id="e-commerce-nav" className="navbar-menu" onClick={closeDrawer}>
                <div className="navbar-start">
                    <NavLink className="navbar-item" to="/" activeStyle={{color: '#ff9900'}}  exact={true}>
                        Home
                    </NavLink>
                    <NavLink className="navbar-item" to="/signup" activeStyle={{color: '#ff9900'}}>
                        Sign up
                    </NavLink>
                    <NavLink className="navbar-item" to="/signin" activeStyle={{color: '#ff9900'}}>
                        Sign in
                    </NavLink>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="field is-grouped">
                            <p className="control">
                                <NavLink className="bd-tw-button button" data-social-network="Twitter"
                                   data-social-action="tweet" data-social-target="http://localhost:4000" target="_blank"
                                   to="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;hashtags=bulmaio&amp;url=http://localhost:4000&amp;via=jgthms">
              <span className="icon">
                <i className="fab fa-twitter"/>
              </span>
                                    <span>
                Tweet
              </span>
                                </NavLink>
                            </p>
                            <p className="control">
                                <NavLink className="button is-primary"
                                   to="https://github.com/jgthms/bulma/releases/download/0.7.5/bulma-0.7.5.zip">
              <span className="icon">
                <i className="fas fa-download"/>
              </span>
                                    <span>Download</span>
                                </NavLink>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default withRouter(Menu);
