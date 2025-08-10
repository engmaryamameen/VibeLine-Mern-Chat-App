const mongoose = require("mongoose");

const lastMessageSchema = new mongoose.Schema(
  {
    messageId: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    text: String,
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: Date,
  },
  { _id: false }
);

const chatSchema = new mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false, index: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    // legacy pointer for old code paths
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },

    // enhanced fields
    type: { type: String, enum: ["private", "group"], default: "private" },
    groupName: { type: String },
    groupImage: { type: String },
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lastMessageObj: lastMessageSchema,
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
