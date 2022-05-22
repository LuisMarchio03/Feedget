import { FeedbackRepositoryInterface } from "../../repositories/feedback-repository-interface";
import MockFeedbackRepository from "../../repositories/mocks/mock-feedback-repository";
import { GetFeedbacksApprovedUseCase } from "./get-feedbacks-approved-use-case";

let repository: FeedbackRepositoryInterface;
let getFeedbacks: GetFeedbacksApprovedUseCase;

let repositoryCreateSpy: MockFeedbackRepository;

describe("Get All Feedbacks approved", () => {
  beforeEach(() => {
    repository = new MockFeedbackRepository();
    getFeedbacks = new GetFeedbacksApprovedUseCase(repository);

    repositoryCreateSpy = repository as MockFeedbackRepository;

    repositoryCreateSpy.feedback = [
      {
        id: "1",
        type: "BUG",
        comment: "comment bug test",
        status: "APPROVED",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        type: "FEATURE",
        comment: "comment feature test",
        status: "APPROVED",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3",
        type: "BUG",
        comment: "comment bug test 3",
        status: "PENDENT",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  });

  afterAll(() => {
    repositoryCreateSpy.feedback = [];
  });

  it("should be able to list all feedbacks approved", async () => {
    const feedbacks = await getFeedbacks.execute();
    expect(feedbacks).toHaveLength(2);
    expect(feedbacks[0].status).toBe("APPROVED");
    expect(feedbacks[1].status).toBe("APPROVED");
  });
});
