import { Request, Response } from "express";
import { generateToken } from "../lib/utils";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary";

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ message: "Password must be at least 6 characters" });
      return;
    }

    const user = await User.findOne({ email });

    if (user) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // generate jwt token here
      generateToken(newUser._id.toString(), res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.log("Error in signup controller", errorMessage);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    generateToken(user._id.toString(), res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.log("Error in login controller", errorMessage);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req: Request, res: Response): void => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.log("Error in logout controller", errorMessage);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { profilePic } = req.body;
    const userId = req.user?._id;

    if (!profilePic) {
      res.status(400).json({ message: "Profile pic is required" });
      return;
    }

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req: Request, res: Response): void => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.log("Error in checkAuth controller", errorMessage);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
