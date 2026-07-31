import Jwt from "jsonwebtoken";
import { JwtPayload, SignOptions } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Logger } from "./logger.js";

export const logger = new Logger("Application");

// Generate Jwt Token
export const generateJwtToken = (
  payload: {
    sub: string;
    email: string;
    role: string;
  },
): string => {
  return Jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "1d",
  });
};

// Verify and decode Jwt Token
export const decodeJwtToken = (token: string): JwtPayload | null => {
  try {
    return Jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
    ) as JwtPayload;
  } catch (error) {
    logger.error("Jwt Verification failed", "Auth", error);
    return null;
  }
};

// Hash Password
export const hashPassword = async (
  password: string,
  saltRound: 10,
): Promise<string> => {
  return await bcrypt.hash(password, saltRound);
};

// Compare password with hash
export const comparePasswords = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
