import { Request, Response, NextFunction } from "express";

export const roleMiddleware = (allowRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const userRole = req.user.role?.toLowerCase();
    console.log("Required roles:", allowRoles);
    console.log("User role:", userRole);

    if (!allowRoles.some((role) => role.toLowerCase() === userRole?.toLowerCase())) {
      return res.status(403).json({
        message: "You don't have permission to access this resource",
      });
    }

    next();
  };
};
