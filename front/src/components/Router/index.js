import React from 'react';
import { Route } from "react-router-dom";
import Logout from "../Logout";
import Articles from "../Articles";
import Article from "../Article";
import SignUp from "../SignUp";
import Login from "../Login";
import PrivateRoute from '../../helpers/private-route';

const Router = () => (
  <>
    <PrivateRoute path="/logout" exact component={Logout} />
    <Route path="/" exact component={Articles} />
    <Route path="/login" exact component={Login} />
    <Route path="/signup" exact component={SignUp} />
    <Route path="/posts/:id" exact component={Article} />
  </>
  )
;

export default Router;