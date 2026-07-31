import BaseRepository from "../base/BaseRepository";
import { IPayment, paymentSchema } from "../../models/payment.Schema";

class PaymentRepository extends BaseRepository<IPayment> {
  constructor() {
    super("Payment", paymentSchema);
  }
}

export default new PaymentRepository();
