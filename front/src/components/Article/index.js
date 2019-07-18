import React, { useEffect,useState,useRef } from 'react';
import { getPost } from "../../api/posts";

const Article = ({ match }) => {
  const [post,setPost] = useState('');
  const ref = useRef({mounted: false});

  useEffect(() => {
    if(!ref.current.mounted) {
      getPost(match.params.id).then(res => setPost(res));
      ref.current.mounted = true;
    }
    console.log(post)

  });
  return post ?
    <>
      <h1>Article { post.title}</h1>
      <p>{post.content}</p>
      <span>{post.created_at}</span>
    </> :
    <div>waiting ...</div>
};

export default Article