import BaseRepository from "../base/BaseRepository.js";
import { IUsers, userSchema } from "../../models/user.Schema.js";

class UserRepository extends BaseRepository<IUsers> {
  constructor() {
    super("User", userSchema);
  }
}

export default new UserRepository();
