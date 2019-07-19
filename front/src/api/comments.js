import axios from './';

export const addComment = async (params) => {
   try {
     const { data } = await axios.post(`/comments`,params);
     return data;
   } catch (e) {
     return e.response.data;
   }
};

export const getCommentsByPost = async (id) => {
   try {
     const { data } = await axios.get(`/posts/${id}/comments`);
     return data;
   } catch (e) {
     return e.response.data;
   }
};

export default addComment;