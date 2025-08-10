const mongoose = require("mongoose");

const reactionsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    emoji: String,
  },
  { _id: false }
);

const mediaMetaSchema = new mongoose.Schema(
  {
    size: Number,
    duration: Number,
    width: Number,
    height: Number,
  },
  { _id: false }
);

const locationSchema = new mongoose.Schema(
  {
    latitude: Number,
    longitude: Number,
  },
  { _id: false }
);

const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    type: {
      type: String,
      enum: ["text", "image", "video", "audio", "file", "location"],
      default: "text",
    },
    content: { type: String, trim: true }, // legacy support
    text: { type: String },
    mediaUrl: { type: String },
    mediaMeta: mediaMetaSchema,
    location: locationSchema,
    reactions: [reactionsSchema],
    replyTo: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    status: { type: String, enum: ["sent", "delivered", "seen"], default: "sent" },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
