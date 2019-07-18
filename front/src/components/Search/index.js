import React, { useState } from 'react';
import {searchPosts} from "../../api/posts";
import { Link } from "react-router-dom";

const Search = () => {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState();
  const [loading, setLoading] = useState(false);

  const search = () => {
    setLoading(true)
    searchPosts(query).then(res => {
      setPosts(res)
      setLoading(false)
    });
  };

  return <>
    <div>
      <label>Recherche : </label>
      <input value={query} onChange={e => setQuery(e.target.value)}  type="text" className="input"/>
      <button onClick={search}>🔍</button>
    </div>
    {posts ? <>
    {posts.map(post =>
      <section key ={Math.random()} class="section">
        <div class="container">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                {post.title}
              </p>
              <a href="#" class="card-header-icon" aria-label="more options">
                    <span class="icon">
                      <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
              </a>
            </header>
            <div class="card-content">
              <div class="content" style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                {post.content}
                <br /><br />
                <time datetime="2016-1-1">{post.created_at}</time>
              </div>
            </div>
            <footer class="card-footer">
              <Link to={`/posts/${post.id}`}>
                <a href="#" class="card-footer-item">Voir l'article</a>
              </Link>
            </footer>
          </div>
        </div>
      </section>
    )}
    {loading ? <div> waiting... </div> : <> </>}
  </> : <>No posts</>}
    </>

};

export default Search;