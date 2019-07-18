import axios from './';

export const getUserFromPost = async (id) => {
    try {
        const { data } = await axios.get(`/users/${id}}`);
        return data;
    } catch (e) {
        return e.response.data;
    }
};