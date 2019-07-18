import React,{ useRef, useEffect, useState }  from 'react';
import getPosts from "../../api/posts";
import { Link } from "react-router-dom";

const Articles = () => {
  const ref = useRef({mounted: false});
  const [posts,setPosts] = useState([]);
  const [loading,setLoading] = useState(false);
  const page = useRef(1);

  useEffect( () => {
    if(!ref.current.mounted && posts){
      ref.current = { mounted: true };
      getPosts(page,10).then(res => setPosts(res));
      page.current += 1;
    }
  });

  window.onscroll = function() {
    const d = document.documentElement;
    const offset = d.scrollTop + window.innerHeight;
    const height = d.offsetHeight;

    if (offset === height && !loading) {
      setLoading(true);
      getPosts(page,10).then(res =>{
        setPosts([...posts,...res])
        setLoading(false);
        page.current += 1;
      });

    }
  };

  return  posts ? <>
        <h2> Articles </h2>
        <div>
          { posts.map(post =>
            <div key={Math.random()}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <span>{post.created_at}</span>
              <Link to={`/posts/${post.id}`}>Voir </Link>

            </div>
          )}
        </div>
      {loading ? <div> waiting... </div> : <> </>}
        </> :<></>

};

export default Articles;