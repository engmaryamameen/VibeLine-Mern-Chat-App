const mongoose = require("mongoose");

const callSchema = new mongoose.Schema(
  {
    callerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    type: { type: String, enum: ["voice", "video"], required: true },
    startedAt: { type: Date },
    endedAt: { type: Date },
    duration: { type: Number },
    status: { type: String, enum: ["missed", "answered", "declined"], default: "missed" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Call", callSchema);


