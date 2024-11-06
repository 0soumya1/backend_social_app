const router = require("express").Router();
const resHandler = require("../middleware/resHandler");
const Conversation = require("../models/Conversation");

// new Conv
router.post("/addConv", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    resHandler(res, 200, true, "Conversation saved", savedConversation);
  } catch (err) {
    resHandler(res, 500, false, " conversation catch err", err);
  }
});

// get conv of a user
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    // console.log("conversation", conversation);
    // console.log("req.params", req.params);

    resHandler(res, 200, true, "Conversation got of a user", conversation);
  } catch (err) {
    resHandler(res, 500, false, "get conversation catch err", err);
  }
});

module.exports = router;
