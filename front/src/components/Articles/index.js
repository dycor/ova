import React, { useRef, useEffect, useState } from 'react';
import getPosts from "../../api/posts";
import { Link } from "react-router-dom";

const Articles = () => {
  const ref = useRef({ mounted: false });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const page = useRef(1);

  useEffect(() => {
    if (!ref.current.mounted && posts) {
      ref.current = { mounted: true };
      getPosts(page, 10).then(res => setPosts(res));
      page.current += 1;
    }
  });

  window.onscroll = function () {
    const d = document.documentElement;
    const offset = d.scrollTop + window.innerHeight;
    const height = d.offsetHeight;

    if (offset === height && !loading) {
      setLoading(true);
      getPosts(page, 10).then(res => {
        setPosts([...posts, ...res])
        setLoading(false);
        page.current += 1;
      });

    }
  };

  return posts ? <>
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
  </> : <></>

};

export default Articles;