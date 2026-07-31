import { Request, Response, NextFunction } from "express";

export const roleMiddleware = (allowRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const userRole = req.user.role;
    console.log("req.user:", req.user);
    if (!allowRoles.includes(userRole)) {
      return res.status(403).json({
        message: "You don't have permission to access this resource",
      });
    }

    next();
  };
};
