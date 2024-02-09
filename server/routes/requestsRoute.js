const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware")
const Request = require("../models/requestModel")
const User = require("../models/userModel")

//Get all requests for a user
router.post("/get-all-requests-by-user", authMiddleware, async (req,res) =>{
  try {
    const requests = await Request.find({
      $or: [{sender: req.body.userId},{receiver: req.body.userId}],
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

//Update a request status
router.post("/update-request-status", authMiddleware, async (req, res) => {
  try {
    if (!req.body._id || !req.body.status) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const request = await Request.findById(req.body._id);
    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    if (req.body.status === "Accepted") {
      // Add the amount to the sender's balance
      await User.findByIdAndUpdate(request.sender._id, {
        $inc: { balance: request.amount }
      });

      // Deduct the amount from the receiver's balance
      await User.findByIdAndUpdate(request.receiver._id, {
        $inc: { balance: -request.amount }
      });
    }

    // Update the request status
    request.status = req.body.status;
    await request.save();

    res.status(200).json({ success: true, message: "Request status updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Request status update failed", error: error.message });
  }
});



module.exports = router;