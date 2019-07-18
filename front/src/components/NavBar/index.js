import React, { useContext,useState }  from 'react';
import { BrowserRouter , Link } from "react-router-dom";
import Router from '../Router';
import { AuthContext } from "../Auth/AuthProvider";

const NavBar = () => {
  const [active,setActive] = useState('home');

  let { user, logout } = useContext(AuthContext);
  return  (
    <BrowserRouter>
      <div>
        <nav>
          <ul  className="menu-list">
            <li>
              <Link className={active === 'home' ? 'is-active' : '' } onClick={() => setActive('home')} to="/">Home</Link>
            </li>
            <li><input /></li>
            {
              user ? <li><button onClick={() => logout()}>Logout</button> </li>:
                <>
                  <li>
                    <Link className={active === 'login' ? ' is-active' : '' } onClick={() => setActive('login')} to="/login">Login</Link>
                  </li>
                  <li>
                    <Link className={active === 'signup' ? ' is-active' : '' } onClick={() => setActive('signup')} to="/signup">Sign up</Link>
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