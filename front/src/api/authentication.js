import axios from './';

const login = async (params = {}) => {
  try {
    const { data } = await axios.post('/authenticate', params);
    return data;
  } catch (e) {
    return e.response.data;
  }
};

export const register = async (params = {}) => {
  try {
    const { data } = await axios.post('/users', params);
    return data;
  } catch (e) {
    return e.response.data;
  }
};

export default login;