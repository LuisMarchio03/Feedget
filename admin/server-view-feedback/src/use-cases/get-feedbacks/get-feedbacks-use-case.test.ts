import { FeedbackRepositoryInterface } from "../../repositories/feedback-repository-interface";
import { MockFeedbackRepository } from "../../repositories/mocks/mock-feedback-repository";

let repository: FeedbackRepositoryInterface;
let getFeedback: GetFeedbacksUseCase;

describe("Get All Feedbacks", () => {
  beforeEach(() => {
    repository = new MockFeedbackRepository();
    getFeedback = new GetFeedbacksUseCase(repository);
  });

  it("should be able to list all feedbacks", async () => {
    const feedbacks = await getFeedback.execute();
    expect(feedbacks).toHaveLength(2);
  });
});
