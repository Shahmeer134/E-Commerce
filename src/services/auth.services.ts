import userRepository from "../repositories/user/user.repository.js";
import {
  comparePasswords,
  generateJwtToken,
} from "../utils/helper.js";

class AuthService {
  async register(data: any) {
    const existingUser = await userRepository.get({
      email: data.email,
    });

    if (existingUser) {
      throw new Error("Email already exists");
    }

    // const hashedPassword = await hashPassword(data.password, 10);

    const user = await userRepository.create({
      name: data.name,
      email: data.email,
      passwordHash: data.password,
      phone: data.phone,
      role: data.role,
      profileImage: data.profileImage || "",
      isVerified: false,
      status: "ACTIVE",
    });

    const userObject = user.toObject();
    delete userObject.passwordHash;

    return userObject;
  }

  async login(data: any) {
    const user = await userRepository.get({
      email: data.email,
    });

    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const passwordMatched = await comparePasswords(
      data.password,
      user.passwordHash,
    );

    if (!passwordMatched) {
      throw new Error("Invalid Credentials");
    }

    const accessToken = generateJwtToken({
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
    });
    const { passwordHash, ...userData } = user.toObject();

    return {
      accessToken,
      user: userData,
    };
  }
}

export default new AuthService();
