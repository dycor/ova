import React, { useEffect, useState, useRef, useContext } from 'react';
import { getPost } from "../../api/posts";
import addComment,{ getCommentsByPost } from "../../api/comments";
import { getUserFromPost } from '../../api/user';
import {AuthContext} from "../Auth/AuthProvider";

const Article = ({ match }) => {
  const [post, setPost] = useState('');
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState('');
  const ref = useRef({ mounted: false });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!ref.current.mounted) {
      getPost(match.params.id).then(res => {
        setPost(res)
        getUserFromPost(res.user_id).then(res =>setAuthor(res));

      });
      getCommentsByPost(match.params.id).then(res => setComments(res) || []);
      ref.current.mounted = true;
    }
  });

  console.log(author)
  const postComment = () => {
    addComment({name: user.firstname , message :newComment , post_id : match.params.id}).then(res => setComments([...comments,res]));
    setNewComment('')
  };


  return post ?
  <>
      <article class="media center" style={{paddingTop: '40px'}}>
        <figure class="media-left">
          <span class="image is-64x64">
            <img src="https://cdn.pixabay.com/photo/2014/04/02/14/11/male-306408_960_720.png" />
						</span>
					</figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{author.name} {author.firstname} </strong> <a>@{author.email}</a><br />
                <span className="has-text-grey">{author.description}<br/>
                    <time datetime="2018-04-20">{post.created_at}</time> · 20 min read</span>
							</p>
						</div>
					</div>
				</article>
            <div class="section is-paddingless-horizontal">
              <h1 class="title is-2">
                {post.title}
              </h1>
              <h2 class="subtitle is-3 has-text-grey-light">
                An ova article ...
					</h2>
            </div>

            <figure class="columns is-mobile is-variable is-0 is-marginless grid-xl">
              <div class="column">
                <div class="image card">
                  <a><img src="https://cdn.pixabay.com/photo/2015/06/24/16/36/office-820390_960_720.jpg" /></a>
                </div>
              </div>
              <div class="column">
                <div class="image card">
                  <a><img src="https://cdn.pixabay.com/photo/2015/05/11/14/44/pencils-762555_960_720.jpg" /></a>
                </div>
              </div>
              <div class="column">
                <div class="image card">
                  <a><img src="https://cdn.pixabay.com/photo/2015/07/31/14/59/creative-869200_960_720.jpg" /></a>
                </div>
              </div>
            </figure>
            <figcaption class="level">
              <small class="level-item has-text-grey">
                The blog we'll build.
					</small>
            </figcaption>

            <div class="content is-medium">
              {post.content}
            </div>
            <div>
              <div>
                <textarea value={newComment} onChange={e => setNewComment(e.target.value)}/>
                <button className="button"  onClick={() => postComment()}>Send </button>
              </div>
              <div>
                {comments.map(comment =>
                  <div className="card">
                  <strong>{comment.name}</strong>
                  <p>{comment.message}</p>
                  </div>)}
              </div>
            </div>
    </>
          :
    <div>waiting ...</div>
          };
          
export default Article
