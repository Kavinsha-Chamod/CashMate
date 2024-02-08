const {axiosInstance} = require(".")

//Verify receiver account

export const VerifyAccount = async (payload) =>{
  try {
    const {data} = await axiosInstance.post("/api/transactions/verify-account", payload);
    return data;

  } catch (error) {
    return error.response.data;
  }
}

//Transfer funds
export const TransferFunds = async (payload) =>{
  try {
    const {data} = await axiosInstance.post("/api/transactions/transfer-funds", payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
}