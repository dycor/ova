import axios from './';

const getPosts = async ({ page, limit }) => {
  try {
    return await axios.get(`/posts?${page}&${limit}`);
  } catch (e) {
    return e.response.data;
  }
};

export const getPost = async (id) => {
  try {
    const { data } = await axios.get(`/posts/${id}}`);
    return data;
  } catch (e) {
    return e.response.data;
  }
};

export const addPost = async (params = {}) => {
  try {
    const { data } = await axios.post('/posts', params);
    return data;
  } catch (e) {
    return e.response.data;
  }
};

export default getPosts;