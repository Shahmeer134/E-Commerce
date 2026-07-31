import BaseRepository from "../base/BaseRepository";
import { ICustomerAddress, customerAddressSchema } from "../../models/customerAddress.Schema";

class CustomerAddressRepository extends BaseRepository<ICustomerAddress> {
  constructor() {
    super("CustomerAddress", customerAddressSchema);
  }
}

export default new CustomerAddressRepository();
