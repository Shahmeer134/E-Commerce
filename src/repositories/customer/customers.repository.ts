import BaseRepository from "../base/BaseRepository";
import { ICustomers, customerSchema } from "../../models/customers.Schema";

class CustomerRepository extends BaseRepository<ICustomers> {
  constructor() {
    super("Customer", customerSchema);
  }
}

export default new CustomerRepository();
