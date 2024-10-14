import axiosInstance from './axiosInstance';

export const getUsers = async (users) => {
    const response = await axiosInstance.get(`/users`);
    console.log(response);
    return response.data;
};

export const createUser = async (user) => {
    try {
        const response = await axiosInstance.post(`/users`, user);
        return response.data;
    } catch (error) {
        console.error("The following error occurred while creating the user: ", error);
        throw error;
    }
};

export const getUserById = async (id) => {
    try {
        const response = await axiosInstance.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error("There was an error retrieving the user", id, error);
        throw error;
    }

};

export const updateUser = async (id, user) => {
  try {
    await axiosInstance.put(`/users/${id}`, user);
  } catch (error) {
    console.error("There was an error updating the user.");
    throw error;
  }
}; 