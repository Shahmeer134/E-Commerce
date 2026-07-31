import BaseRepository from "../base/BaseRepository";
import { IReview, reviewSchema } from "../../models/reviewStatus.Schema";

class ReviewRepository extends BaseRepository<IReview> {
  constructor() {
    super("Review", reviewSchema);
  }
}

export default new ReviewRepository();
