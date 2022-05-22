import { FeedbackRepositoryInterface } from "../../repositories/feedback-repository-interface";
import MockFeedbackRepository from "../../repositories/mocks/mock-feedback-repository";
import { GetFeedbacksRejectedUseCase } from "./get-feedbacks-rejected-use-case";

let repository: FeedbackRepositoryInterface;
let getFeedbacks: GetFeedbacksRejectedUseCase;

let repositoryCreateSpy: MockFeedbackRepository;

describe("Get All Feedbacks rejected", () => {
  beforeEach(() => {
    repository = new MockFeedbackRepository();
    getFeedbacks = new GetFeedbacksRejectedUseCase(repository);

    repositoryCreateSpy = repository as MockFeedbackRepository;

    repositoryCreateSpy.feedback = [
      {
        id: "1",
        type: "BUG",
        comment: "comment bug test",
        status: "REJECTED",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        type: "FEATURE",
        comment: "comment feature test",
        status: "REJECTED",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3",
        type: "BUG",
        comment: "comment bug test 3",
        status: "APPROVED",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  });

  afterAll(() => {
    repositoryCreateSpy.feedback = [];
  });

  it("should be able to list all feedbacks rejected", async () => {
    const feedbacks = await getFeedbacks.execute();
    expect(feedbacks).toHaveLength(2);
    expect(feedbacks[0].status).toBe("REJECTED");
    expect(feedbacks[1].status).toBe("REJECTED");
  });
});
