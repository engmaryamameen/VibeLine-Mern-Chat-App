import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

interface JwtPayload {
  userId: string;
}

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.status(401).json({ message: "Unauthorized - No Token Provided" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    if (!decoded) {
      res.status(401).json({ message: "Unauthorized - Invalid Token" });
      return;
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.log("Error in protectRoute middleware: ", errorMessage);
    res.status(500).json({ message: "Internal server error" });
  }
};
