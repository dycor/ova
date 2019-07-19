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

export const setPost = async (id, params = {}) => {
  try {
    console.log(id);
    console.log(params);
    const { data } = await axios.put(`/posts/${id}`, params);
    return data;
  } catch (e) {
    return e.response.data;
  }
}

export const addPost = async (params = {}) => {
  try {
    const { data } = await axios.post('/posts', params);
    return data;
  } catch (e) {
    return e.response.data;
  }
};

export const myPosts = async (id) => {
  try {
    const { data } = await axios.get(`/users/${id}/posts`);
    return data;
  } catch (e) {
    return e.response.data;
  }
};

export const deletePost = async (id) => {
  try {
    const { data } = await axios.delete(`/posts/${id}`);
    return data;
  } catch (e) {
    return e.response.data;
  }
};

export const searchPosts = async (query) => {
  try {
    const { data } = await axios.get(`/search?query=${query}`);
    return data;
  } catch (e) {
    return e.response.data;
  }
};

export default getPosts;