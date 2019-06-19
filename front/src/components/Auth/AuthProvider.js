import React, { createContext, Component } from "react";
import decode  from 'jwt-decode';
import loginApi from '../../api/authentication';
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
    console.log('je me log')
    // const requestOptions = {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email : 'dylan.correia@hotmail.com', password: 'tenst' }),
    // };
    // fetch(`http://localhost:3000/authenticate`, requestOptions)
    //   .then( response => {
    //     console.log(response)
    //   })
    //   .catch(errors => console.log('error',errors))

    // loginApi({ email : 'dylan.correia@hotmail.com', password: 'test' }).then(response => {
    //   console.log('response',)
    //     sessionStorage.setItem('jwt', response.auth_token);
    //     this.setState({user :decode(response.auth_token)});
    // }).catch(error => console.log(error))
    let response;
     try {
       response  =  await loginApi({ email : 'dylan.correia@hotmail.com', password: 'test' });

     } catch (e) {
       console.log('error ',e)
     }
     console.log('decode',response)

     if(response){
       const token = response.auth_token;

       sessionStorage.setItem('jwt', token);
       this.setState({user :decode(token)});
     }
     // if(token) {
    //   console.log('token',token)
      // let data;
      // try {
      //   data = await decode(token);
      //   // valid token format
      // } catch(error) {
      //   // invalid token format
      // }
      // console.log('data',data)
      // sessionStorage.setItem('jwt', token);
      // this.setState({user :token});
    // }

    // const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJleHAiOjE1NTg3OTE5ODR9.W3ICYid6cBmUcPWdxFIUSv7w-Je_sE6nljceXMKtuUE';
    // sessionStorage.setItem('jwt', token);
    // this.setState({user :decode(token)});
  };

  logout = () => {
    console.log('je me deco')
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