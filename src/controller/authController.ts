import { Request, Response, NextFunction } from "express";
import AuthService from "../services/auth.services.js";
import bcrypt from "bcrypt";
import userRepository from "../repositories/user/user.repository.js";

export class authController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await AuthService.register(req.body);
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.login(req.body);
      res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async me(req: Request, res: Response) {
    const userId = req.user?.sub;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user = await userRepository.get({
      _id: userId,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const userData = user.toObject();

    delete userData.passwordHash;

    return res.status(200).json({
      success: true,
      message: "User profile fetched",
      data: userData,
    });
  }

  async admin(req: Request, res: Response) {
    res.status(200).json({
      success: true,
      message: "Welcome Admin",
      user: req.user,
    });
  }

   async user(req: Request, res: Response) {
    res.status(200).json({
      success: true,
      message: "Welcome Customer",
      user: req.user,
    });
  }
}
