import React, { useRef, useEffect, useState } from 'react';
import { getPost, setPost } from "../../api/posts";
import { Redirect } from "react-router-dom";

const ModifyArticle = ({ match }) => {
    const ref = useRef({ mounted: false });
    const [article, setArticle] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [updated, setUpdated] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleSubmit = event => {
        event.preventDefault();
        let err = [];

        if (!title) {
            err.push('EMpty title');
        }
        if (!content) {
            err.push('empty description');
        }
        setErrors(err);
        if (err.length === 0) {
            setPost(article.id, { title, content }).then(response => {
                if (response.id) {
                    setUpdated(true);
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

    useEffect(() => {
        if (!ref.current.mounted) {
            getPost(match.params.id).then(res => setArticle(res));
            ref.current.mounted = true;
        }
    });

    return article ? <>
        {updated && <Redirect to="/myposts"/>}
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
                                        <div class="control has-icons-left has-icons-right">
                                            <input class="input" type="text" placeholder={article.title} value={title} name="title" onChange={e => setTitle(e.target.value)} required={true} />
                                            <span class="icon is-small is-left">
                                                <i class="fas fa-user"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Description</label>
                                    <div class="control">
                                        <textarea class="textarea" placeholder={article.content} name="content" value={content} onChange={e => setContent(e.target.value)} required={true}></textarea>
                                    </div>
                                </div>

                                <div class="field">
                                    <button type="Submit" class="button is-success">
                                        Update
              </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </> : <div> waiting... </div>

};

export default ModifyArticle;