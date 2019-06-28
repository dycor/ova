import React, {useContext,useState} from 'react';
import { AuthContext } from "../Auth/AuthProvider";

const Login = (props) => {
  let { login } = useContext(AuthContext);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  let [errors,setErrors] = useState({'email' : '','connection':''});

  const handleSubmit = e => {
    e.preventDefault();
    login(email,password).then( response => {
      if(response) {
        props.history.push(`/`);
      } else {
        setErrors({connection: 'Invalid credentials'});
      }
    });

  };

  const handleChange = event => {
    if(event.target.id === 'email') {
      setEmail(event.target.value);

      const emailValid = event.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

      if (!emailValid) errors['email']= 'Invalid mail';
      else errors['email']= '';

      setErrors(errors)
    }
    else if (event.target.id === 'password') setPassword(event.target.value);
  };


  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input id="email" type="email" value={email} onChange={handleChange} />
        { errors.email ? <label>{errors.email}</label> : <></>}
      </label>
      <label>
        Password:
        <input id="password" type="password" value={password} onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
      { errors.connection ? <label>{errors.connection}</label> : <></>}
    </form>
  );
};

export default Login;