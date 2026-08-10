import BaseRepository from "../base/BaseRepository.js";
import { IReview, reviewSchema } from "../../models/reviewStatus.Schema.js";

class ReviewRepository extends BaseRepository<IReview> {
  constructor() {
    super("Review", reviewSchema);
  }
}

export default new ReviewRepository();
