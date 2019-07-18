import React, { useContext, useState } from 'react';
import { BrowserRouter, Link } from "react-router-dom";
import Router from '../Router';
import { AuthContext } from "../Auth/AuthProvider";

const NavBar = () => {
  const [active, setActive] = useState('home');

  let { user, logout } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <div>
        <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <a class="navbar-item" href="https://bulma.io">
            <h1 class="title has-text-white">OVA</h1>
    </a>

            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
              <Link className={active === 'home' ? 'is-active' : ''} onClick={() => setActive('home')} to="/">
                <a class="navbar-item has-text-white">
                  Home
      </a>
              </Link>
            </div>
            <div class="navbar-end">
              <div class="navbar-item">
                <div class="buttons">
                  {
                    user ?
                    <>
                      <Link to="/create">
                        <a class="button is-light">
                            New Article
                          </a>
                      </Link>
                      <a onClick={() => logout()} class="button is-light">
                        Logout
                      </a>
                      </> :
                      <>
                        <Link className={active === 'login' ? ' is-active' : ''} onClick={() => setActive('login')} to="/login">
                          <a class="button is-light">
                            Log in
                          </a>
                        </Link>
                        <Link className={active === 'signup' ? ' is-active' : ''} onClick={() => setActive('signup')} to="/signup">
                          <a class="button is-link">
                            <strong>Sign up</strong>
                          </a>
                        </Link>
                      </>
                  }

                </div>
              </div>
            </div>
          </div>
        </nav>
        <Router />
        {/* <input class="input is-primary" type="text" placeholder="Search article"></input> */}
      </div>
    </BrowserRouter>
  );
};

export default NavBar;