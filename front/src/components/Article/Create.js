import React, { useState,useContext } from 'react';
import { addPost } from "../../api/posts";
import {AuthContext} from "../Auth/AuthProvider";


const Create = props => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);
  const { user } = useContext(AuthContext); 

  const handleSubmit = event => {
    event.preventDefault();
    let err = [];

    if (!title) {
      err.push('Invalid title');
    }
    if (!content) {
      err.push('Invalid content');
    }
    setErrors(err);
    if (err.length === 0) {
        const userId = user.user_id;
        console.log(userId);
        
        addPost({title, content, user_id : userId}).then(response => {
        //console.log(Object.keys(response))
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
                      <label class="label">Title</label>
                      <div class="">
                        <input class="input" type="text" placeholder="Title" value={title} name="title" onChange={e => setTitle(e.target.value)} required={true} />
                        <span class="icon is-small is-left">
                        </span>
                      </div>
                    </div>

                  <div class="field">
                    <label class="label">Content</label>
                    <div class="control">
                      <textarea class="textarea" placeholder="Textarea" value={content} onChange={e => setContent(e.target.value)} maxLength={250} required={true}></textarea>
                    </div>
                  </div>

                  <div class="field">
                    <button type="Submit" class="button is-success">
                      Submit
                    </button>
                  </div>
                  </div>
                </form>
            </div>
          </div>
        </div>
        </div>
      </section>
  )


};

export default Create;