import axios from './';

const login = async (params = {}) => {
  try {
    const { data } = await axios.post('/authenticate', params);
    return data;
  } catch (e) {
    return e;
  }
};

export default login;