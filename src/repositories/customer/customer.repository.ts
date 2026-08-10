import BaseRepository from "../base/BaseRepository.js";
import { ICustomers, customerSchema } from "../../models/customer.Schema.js";

class CustomerRepository extends BaseRepository<ICustomers> {
  constructor() {
    super("Customer", customerSchema);
  }
}

export default new CustomerRepository();
