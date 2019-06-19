import React, {useContext} from 'react';
import { AuthContext } from "../Auth/AuthProvider";

const Logout = (props) => {
  let { logout } = useContext(AuthContext);

  const onClick = () => {
    logout();
    console.log('lll')
    props.history.push(`/`);

  };
  return ( <button onClick={() => onClick()}>Logout</button> );
};

export default Logout;