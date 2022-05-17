import { FeedbackRepositoryInterface } from "../../repositories/feedback-repository-interface";

let repository: FeedbackRepositoryInterface;
let getFeedback: GetFeedbacksUseCase;

describe("Get All Feedbacks", () => {
  beforeEach(() => {
    repository = new MockFeedbackRepository();
    getFeedback = new GetFeedbacksUseCase(repository);
  });
});
