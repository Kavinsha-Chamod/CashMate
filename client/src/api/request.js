import { axiosInstance } from ".";

//Get all requests for a user
export const GetAllRequestsByUser = async()=>{
  try {
    const {data} = await axiosInstance.post("/api/requests/get-all-requests-by-user")
    return data;
  } catch (error) {
    return error.response.data;
  }
}

//Send a requset to another user
export const SendRequest = async (request) =>{
  try {
    const {data} = await axiosInstance.post("/api/requests/send-request", request)
    return data;
  } catch (error) {
    return error.response.data;
  }
}
