import React, { useContext, useState } from 'react';
import { AuthContext } from "../Auth/AuthProvider";

const Login = (props) => {
  let { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let [errors, setErrors] = useState({ 'email': '', 'connection': '' });

  const handleSubmit = e => {
    e.preventDefault();
    login(email, password).then(response => {
      if (response.error) {
        setErrors({ connection: response.error.user_authentication.join(' ') });
      } else {
        props.history.push(`/`);

      }
    });

  };

  const handleChange = event => {
    if (event.target.id === 'email') {
      setEmail(event.target.value);

      const emailValid = event.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

      if (!emailValid) errors['email'] = 'Invalid mail';
      else errors['email'] = '';

      setErrors(errors)
    }
    else if (event.target.id === 'password') setPassword(event.target.value);
  };


  return (
      <section class="hero is-light is-fullheight">
        <div class="hero-body">
          <div class="container">
            <div class="columns is-centered">
              <div class="column is-5-tablet is-4-desktop is-3-widescreen">
                <form onSubmit={handleSubmit} class="box">
                  <div class="field">
                    {errors.email
                      ?
                      <article class="message is-danger">
                        <div class="message-header">
                          <p>Warning</p>
                        </div>
                        <div class="message-body">
                          {errors.email}
                        </div>
                      </article> : 
                      <></>
                      }
                      {errors.connection 
                        ? 
                        <article class="message is-danger">
                        <div class="message-header">
                          <p>Warning</p>
                        </div>
                        <div class="message-body">
                          {errors.connection}
                        </div>
                      </article>
                        : 
                        <></>
                        }
                    <label for="" class="label">Email</label>
                    <div class="control has-icons-left">
                      <input type="email" placeholder="e.g. bobsmith@gmail.com" class="input" id="email" value={email} onChange={handleChange} required />
                      {errors.email ? <label >{errors.email}</label> : <></>}
                      <span class="icon is-small is-left">
                        <i class="fa fa-envelope"></i>
                      </span>
                    </div>
                  </div>
                  <div class="field">
                    <label for="" class="label">Password</label>
                    <div class="control has-icons-left">
                      <input type="password" placeholder="*******" class="input" id="password" value={password} onChange={handleChange} required />
                      <span class="icon is-small is-left">
                        <i class="fa fa-lock"></i>
                      </span>
                    </div>
                  </div>
                  <div class="field">
                  </div>
                  <div class="field">
                    <button type="Submit" class="button is-success">
                      Login
              </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Login;