import React, { useState, useContext } from 'react';
import { AuthContext } from "../Auth/AuthProvider";

const SignUp = props => {
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [description, setDescription] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [errors, setErrors] = useState([]);
  let { register } = useContext(AuthContext);

  const handleSubmit = event => {
    event.preventDefault();
    let err = [];

    if (!email) {
      err.push('Invalid email');
    }
    if (!firstname) {
      err.push('Invalid firstname');
    }
    if (!lastname) {
      err.push('Invalid lastname');
    }
    if (!password) {
      err.push('Invalid password');
    }
    if (password !== passwordVerify) {
      err.push('Passwords are not identical');
    }
    setErrors(err);
    if (err.length === 0) {
      register(lastname, firstname, lastname, email, password, description).then(response => {
        console.log(Object.keys(response))
        if (response.id) {
          props.history.push(`/`);
        } else {
          Object.keys(response).forEach(key => {
            const val = key + ' ' + response[key].join(' ');
            err = [...err, val];
          });
          setErrors(err);
        }
      });
    }
  };

  return (
      <section class="hero is-light is-fullheight">
        <div class="hero-body">
          <div class="container">
            <div class="columns is-centered">
              <div class="column is-5-tablet is-4-desktop is-3-widescreen">
                <form onSubmit={handleSubmit} class="box">
                  {errors.map(error => (
                    <article class="message is-danger">
                    <div class="message-header">
                      <p>Warning</p>
                    </div>
                    <div key={error} class="message-body">
                      {errors}
                    </div>
                  </article>
                  ))}
                  <div class="field">
                    <div class="field">
                      <label class="label">Firstname</label>
                      <div class="control has-icons-left has-icons-right">
                        <input class="input" type="text" placeholder="John" value={firstname} name="firstname" onChange={e => setFirstname(e.target.value)} required={true} />
                        <span class="icon is-small is-left">
                          <i class="fas fa-user"></i>
                        </span>
                      </div>
                    </div>

                    <div class="field">
                      <label class="label">Lastname</label>
                      <div class="control has-icons-left has-icons-right">
                        <input class="input" type="text" placeholder="Doe" value={lastname} name="lastname" onChange={e => setLastname(e.target.value)} required={true} />
                        <span class="icon is-small is-left">
                          <i class="fas fa-user"></i>
                        </span>
                      </div>
                    </div>

                    <label for="" class="label">Email</label>
                    <div class="control has-icons-left">
                      <input type="email" placeholder="e.g. bobsmith@gmail.com" class="input" id="email" value={email} name="email" onChange={e => setEmail(e.target.value)} required={true}/>
                      {errors.email ? <label >{errors.email}</label> : <></>}
                      <span class="icon is-small is-left">
                        <i class="fa fa-envelope"></i>
                      </span>
                    </div>
                  </div>

                  <div class="field">
                    <label for="" class="label">Password</label>
                    <div class="control has-icons-left">
                      <input type="password" placeholder="*******" class="input" id="password" value={password} name="password" onChange={e => setPassword(e.target.value)} required={true} />
                      <span class="icon is-small is-left">
                        <i class="fa fa-lock"></i>
                      </span>
                    </div>
                  </div>

                  <div class="field">
                    <label for="" class="label">Repeat Password</label>
                    <div class="control has-icons-left">
                      <input type="password" placeholder="*******" class="input" id="password-verify" value={passwordVerify} name="passwordVerify" onChange={e => setPasswordVerify(e.target.value)} required={true} />
                      <span class="icon is-small is-left">
                        <i class="fa fa-lock"></i>
                      </span>
                    </div>
                  </div>

                  <div class="field">
                    <label class="label">Description</label>
                    <div class="control">
                      <textarea class="textarea" placeholder="Textarea" value={description} onChange={e => setDescription(e.target.value)} maxLength={140} required={true}></textarea>
                    </div>
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
  )


};

export default SignUp;