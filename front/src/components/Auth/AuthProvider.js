import React, { createContext, Component } from "react";
import decode  from 'jwt-decode';
import loginApi,{register} from '../../api/authentication';
import actions from './actions';
import publicActions from '../../helpers/public-actions';

export const AuthContext = createContext({});

class AuthProvider extends Component {

  state = {
    user: null,
  };

  componentDidMount(){
    const token = sessionStorage.getItem('jwt');
    if(token) this.setState({user :decode(token)});
  }

  login = async (email, password) => {
    const response  =  await loginApi({ email, password});
    if(response.auth_token){
      const token = response.auth_token;
      sessionStorage.setItem('jwt', token);
      this.setState({user :decode(token)});
    }
    return response;
  };

  register = async (name,firstname, lastname, email, password,description) => {
    return  await register({ name, firstname, lastname, email, password,description});
  };

  logout = () => {
    sessionStorage.removeItem('jwt');
    this.setState({user : null});
  };


  render() {
    return (
      <AuthContext.Provider value={{ ...this.state, ...publicActions(this, actions) }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;