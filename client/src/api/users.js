const { axiosInstance } = require(".");

//Login User
export const LoginUser = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/api/users/login", payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

//Register User
export const RegisterUser = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/api/users/register", payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

//Get user Info
export const GetUserInfo = async () => {
  try {
    const {data} = await axiosInstance.post("/api/users/get-user-info");
    return data;
  } catch (error) {
    return error.response.data;
  }
}

//Get all users
export const GetAllUsers = async () => {
  try {
    const {data} = await axiosInstance.post("/api/users/get-all-users");
    return data;
  } catch (error) {
    return error.response.data;
  }
}

//Update user verified status
export const UpdateUserVerifiedStatus = async (payload) => {
  try {
    const {data} = await axiosInstance.post("/api/users/update-user-verified-status", payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
}