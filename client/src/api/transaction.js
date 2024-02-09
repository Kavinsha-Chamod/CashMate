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

//Get all transactions for a user
export const GetTransactionsOfUser = async ()=>{
  try {
    const {data} = await axiosInstance.post("/api/transactions/get-all-transactions-by-user")
    return data;
  } catch (error) {
    return error.response.data;
  }
}

//Deposit money using stripe account
export const DepositFunds = async (payload)=>{
  try {
    const {data} = await axiosInstance.post("/api/transactions/deposit-funds",payload)
    return data;
  } catch (error) {
    return error.response.data;
  }
}