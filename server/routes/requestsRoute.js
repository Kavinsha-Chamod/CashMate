const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware")
const Request = require("../models/requestModel")

//Get all requests for a user
router.post("/get-all-requests-by-user", authMiddleware, async (req,res) =>{
  try {
    const requests = await Request.find({
      $or: [{sender: req.user._id},{receiver: req.user._id}],
    })
    .populate("sender")
    .populate("receiver")

    res.send({data: requests, message: "Requests fetched successfully", success: true})
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})

//Send request to another user
router.post("/send-request", authMiddleware ,async (req,res) =>{
  try {
    const {receiver, amount,description} = req.body;

    const request = new Request({
      sender: req.body.userId,
      receiver,
      amount,
      description,
    })

    await request.save();

    res.send({data:request,message: "Request sent successfully", success:true})
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})

module.exports = router;