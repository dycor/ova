import React,{useState,useContext}  from 'react';
import {AuthContext} from "../Auth/AuthProvider";

const SignUp = props =>{
  const [lastname,setLastname] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [firstname,setFirstname] = useState('');
  const [description,setDescription] = useState('');
  const [passwordVerify,setPasswordVerify] = useState('');
  const [errors,setErrors] = useState([]);
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
    if(err.length === 0){
      register(lastname,firstname,email,password,description).then( response => {
        console.log(Object.keys(response))
        if(response.id) {
          props.history.push(`/`);
        } else {
          Object.keys(response).forEach(key => {
            const val = key + ' ' + response[key].join(' ');
            err = [...err,val];
          });
          setErrors(err);
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.map(error => (
        <p key={error}>{error}</p>
      ))}
      <div className="field">
        <label >
          Lastname:
        </label>
        <input className="input" required={true} type="text" value={lastname} name="firstname" onChange={e => setLastname(e.target.value)}/>
      </div>
      <div className="field">
        <label >
          Firstname:
        </label>
        <input className="input" required={true} type="text" value={firstname} name="lastname" onChange={e => setFirstname(e.target.value)}/>
      </div>
      <div className="field">
        <label >
          Email:
        </label>
        <input className="input" required={true} type="email" value={email} onChange={e => setEmail(e.target.value)} name="email" />
      </div>
      <div className="field">
        <label >
          Password:
        </label>
        <input className="input" required={true} type="password" value={password} onChange={e => setPassword(e.target.value)} name="password" />
      </div>
      <div className="field">
        <label >
          Password:
        </label>
        <input className="input" required={true} type="password" value={passwordVerify} onChange={e => setPasswordVerify(e.target.value)} name="password" />
      </div>
      <div className="field">
        <textarea  className="textarea" required={true} rows={5} cols={35} value={description} onChange={e => setDescription(e.target.value)} maxLength={140}/>
      </div>
      <input type="submit" value="S'inscrire" className="button" />
    </form>
  )


};

export default SignUp;