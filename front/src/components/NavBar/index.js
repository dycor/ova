import React, { useContext }  from 'react';
import { BrowserRouter , Link } from "react-router-dom";
import Router from '../Router';
import { AuthContext } from "../Auth/AuthProvider";

const NavBar = () => {
  let { user, logout } = useContext(AuthContext);
  return  (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li><input /></li>
            {
              user ? <li><button onClick={() => logout()}>Logout</button> </li>:
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/signup">Sign up</Link>
                  </li>
                </>
            }

          </ul>
        </nav>
        <Router />
      </div>
    </BrowserRouter>
  );
};

export default NavBar;