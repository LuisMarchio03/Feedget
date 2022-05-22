import { FeedbackRepositoryInterface } from "../../repositories/feedback-repository-interface";
import MockFeedbackRepository from "../../repositories/mocks/mock-feedback-repository";
import { GetFeedbacksPendentUseCase } from "./get-feedbacks-pendent-use-case";

let repository: FeedbackRepositoryInterface;
let getFeedbacks: GetFeedbacksPendentUseCase;

let repositoryCreateSpy: MockFeedbackRepository;

describe("Get All Feedbacks pendent", () => {
  beforeEach(() => {
    repository = new MockFeedbackRepository();
    getFeedbacks = new GetFeedbacksPendentUseCase(repository);

    repositoryCreateSpy = repository as MockFeedbackRepository;

    repositoryCreateSpy.feedback = [
      {
        id: "1",
        type: "BUG",
        comment: "comment bug test",
        status: "PENDENT",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        type: "FEATURE",
        comment: "comment feature test",
        status: "PENDENT",
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

  it("should be able to list all feedbacks pendent", async () => {
    const feedbacks = await getFeedbacks.execute();
    expect(feedbacks).toHaveLength(2);
    expect(feedbacks[0].status).toBe("PENDENT");
    expect(feedbacks[1].status).toBe("PENDENT");
  });
});
