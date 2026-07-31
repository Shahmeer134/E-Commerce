import BaseRepository from "./base/BaseRepository";
import { IBankAccount, bankAccountSchema } from "../../models/backAccount.Schema";

class BankAccountRepository extends BaseRepository<IBankAccount> {
  constructor() {
    super("BankAccount", bankAccountSchema);
  }
}

export default new BankAccountRepository();
