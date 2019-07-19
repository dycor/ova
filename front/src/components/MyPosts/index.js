import React,{ useRef, useEffect, useState, useContext }  from 'react';
import { myPosts, deletePost } from "../../api/posts";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";

const MyPosts = () => {
  const ref = useRef({mounted: false});
  const [posts,setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect( () => {
    if(!ref.current.mounted || !posts.length){
      ref.current = { mounted: true };
      if(user) myPosts(user.user_id).then(res => setPosts(res))
    }
  });
  const deleteUserPost = id => {
    deletePost(id);
    setPosts(posts.filter(post => post.id !== id));
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
          <Link to={`/modifyArticle/${post.id}`}>Modify</Link>
          <button className="button" onClick={ () => deleteUserPost(post.id)}>DELETE</button>
        </div>
      )}
    </div>
  </> : <div> waiting... </div>

};

export default MyPosts;