const router = require("express").Router();
const resHandler = require("../middleware/resHandler");
const Message = require("../models/Message");

// add msg

router.post("/addMsg", async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    resHandler(res, 200, true, "message added", savedMessage);
  } catch (err) {
    resHandler(res, 500, false, " add msg catch err", err);
  }
});

// get msg

router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    resHandler(res, 200, true, "messages got", messages);
  } catch (err) {
    resHandler(res, 500, false, " add msg catch err", err);
  }
});

module.exports = router;
