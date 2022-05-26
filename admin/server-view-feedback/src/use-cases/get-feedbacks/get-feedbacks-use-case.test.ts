import { FeedbackRepositoryInterface } from "../../repositories/feedback-repository-interface";
import MockFeedbackRepository from "../../repositories/mocks/mock-feedback-repository";
import { GetFeedbacksUseCase } from "./get-feedbacks-use-case";

let repository: FeedbackRepositoryInterface;
let getFeedback: GetFeedbacksUseCase;

let repositoryCreateSpy: MockFeedbackRepository;

describe("Get All Feedbacks", () => {
  beforeEach(() => {
    repository = new MockFeedbackRepository();
    getFeedback = new GetFeedbacksUseCase(repository, null);

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
        status: "APPROVED",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  });

  afterAll(() => {
    repositoryCreateSpy.feedback = [];
  });

  it("should be able to list all feedbacks", async () => {
    expect(await getFeedback.execute()).toHaveLength(2);
  });
});
