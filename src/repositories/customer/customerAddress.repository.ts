import BaseRepository from "../base/BaseRepository.js";
import { ICustomerAddress, customerAddressSchema } from "../../models/customerAddress.Schema.js";

class CustomerAddressRepository extends BaseRepository<ICustomerAddress> {
  constructor() {
    super("CustomerAddress", customerAddressSchema);
  }
}

export default new CustomerAddressRepository();
