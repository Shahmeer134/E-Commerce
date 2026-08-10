import BaseRepository from "../base/BaseRepository.js";
import { IBankAccount, bankAccountSchema } from "../../models/backAccount.Schema.js";

class BankAccountRepository extends BaseRepository<IBankAccount> {
  constructor() {
    super("BankAccount", bankAccountSchema);
  }
}

export default new BankAccountRepository();
