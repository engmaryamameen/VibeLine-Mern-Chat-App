import { Request, Response } from "express";
import User from "../models/user.model";
import Message from "../models/message.model";

import cloudinary from "../lib/cloudinary";
import { getReceiverSocketId, io } from "../lib/socket";

export const getUsersForSidebar = async (req: Request, res: Response): Promise<void> => {
  try {
    const loggedInUserId = req.user?._id;
    if (!loggedInUserId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in getUsersForSidebar: ", errorMessage);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user?._id;

    if (!myId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.log("Error in getMessages controller: ", errorMessage);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user?._id;

    if (!senderId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    let imageUrl: string | undefined;
    if (image) {
      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.log("Error in sendMessage controller: ", errorMessage);
    res.status(500).json({ error: "Internal server error" });
  }
};
