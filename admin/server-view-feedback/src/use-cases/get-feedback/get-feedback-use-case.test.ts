import { FeedbackRepositoryInterface } from "../../repositories/feedback-repository-interface";
import MockFeedbackRepository from "../../repositories/mocks/mock-feedback-repository";
import { GetFeedbackUseCase } from "./get-feedback-use-case";

let repository: FeedbackRepositoryInterface;
let getFeedback: GetFeedbackUseCase;

let repositoryCreateSpy: MockFeedbackRepository;

describe("Get All Feedback", () => {
  beforeEach(() => {
    repository = new MockFeedbackRepository();
    getFeedback = new GetFeedbackUseCase(repository);

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

  it("should be able to list one feedback", async () => {
    expect(await getFeedback.execute("1")).toBeTruthy();
    expect(await getFeedback.execute("1")).toBe(
      repositoryCreateSpy.feedback[0]
    );
  });
});
