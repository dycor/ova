import React, { Component } from 'react';
import AuthProvider from "../Auth/AuthProvider";
import NavBar from '../NavBar/index';
import 'bulma/css/bulma.css'

class App extends Component {

  render() {

    return (
        <AuthProvider >
          <NavBar />
        </AuthProvider>

    );
  }
}

export default App;
