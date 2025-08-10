const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId, type, text, mediaUrl, mediaMeta, location, replyTo } = req.body;

  if ((!content && !text && !mediaUrl && !location) || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content, // legacy
    chat: chatId,
    type: type || (mediaUrl ? "image" : location ? "location" : "text"),
    text,
    mediaUrl,
    mediaMeta,
    location,
    replyTo,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic").execPopulate();
    message = await message.populate("chat").execPopulate();
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    // Maintain both legacy pointer and enriched lastMessage object
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message._id,
      lastMessageObj: {
        messageId: message._id,
        text: message.text || message.content,
        senderId: message.sender._id || message.sender,
        createdAt: message.createdAt,
      },
    });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allMessages, sendMessage };
