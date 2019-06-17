import React from 'react';
import {NavLink, withRouter} from "react-router-dom";
import shoppingLogo from '../assets/cart.svg'
import '../App.css'
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

    const openNav = () => {
        document.getElementById("mySidenav").style.width = "250px";
    }

    const closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
    }
    return (
        <nav className="navbar is-link is-fixed-top">
            <div id="mySidenav" className="sidenav">
                {/*<a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>*/}
                {/*<a href="#">About</a>*/}
                {/*<a href="#">Services</a>*/}
                {/*<a href="#">Clients</a>*/}
                {/*<a href="#">Contact</a>*/}
                <aside className="menu">
                    <p className="menu-label">
                        E-Commerce
                    </p>
                    <ul className="menu-list">
                        <li><NavLink to="/" onClick={closeNav} activeStyle={{color: '#ff9900'}}  exact={true}>Home</NavLink></li>
                        <li><NavLink to="/signup" onClick={closeNav} activeStyle={{color: '#ff9900'}}>SignUp</NavLink></li>
                        <li><NavLink to="/signin" onClick={closeNav} activeStyle={{color: '#ff9900'}}>SignIn</NavLink></li>
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
