import BaseRepository from "../base/BaseRepository.js";
import { IPayment, paymentSchema } from "../../models/payment.Schema.js";

class PaymentRepository extends BaseRepository<IPayment> {
  constructor() {
    super("Payment", paymentSchema);
  }
}

export default new PaymentRepository();
