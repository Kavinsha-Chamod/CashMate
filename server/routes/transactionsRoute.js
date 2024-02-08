const Transaction = require('../models/transactionModel');
const authMiddleware = require('../middlewares/authMiddleware');
const router = require('express').Router();
const User = require('../models/userModel')

//Transfer money from 1 acc to another
router.post('/transfer-funds',authMiddleware, async (req,res)=>{
  try {
    //Saving the transaction
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();

    //Decrease the senders balance
    await User.findByIdAndUpdate(req.body.sender,{
      $inc: {balance: -req.body.amount},
    })

    //Increase the receiver balance
    await User.findByIdAndUpdate(req.body.receiver,{
      $inc: {balance: req.body.amount},
    })

    res.send({message:"Transaction Successful", data:newTransaction, success:true})
  } catch (error) {
    res.send({message:"Transaction Failed", data: error.message, success:false})
  }
})

//Verify receiver acc number
router.post('/verify-account',authMiddleware, async (req,res)=>{
  try {
    const user = await User.findOne({_id: req.body.receiver})
    if(user){
      res.send({message:"Account Verified", data:user, success:true,})
    }else{
      res.send({message:"Account not found", data:null, success:false,})
    }
  } catch (error) {
    res.send({message:"Account not found", data:null, success:false,})
    
  }
})

module.exports =router;