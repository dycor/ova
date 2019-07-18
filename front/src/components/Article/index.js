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
							<a><img src="https://cdn.pixabay.com/photo/2015/05/11/14/44/pencils-762555_960_720.jpg"/></a>
						</div>
					</div>
					<div class="column">
						<div class="image card">
							<a><img src="https://cdn.pixabay.com/photo/2015/07/31/14/59/creative-869200_960_720.jpg"/></a>
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
    </>
   :
    <div>waiting ...</div>
};

export default Article