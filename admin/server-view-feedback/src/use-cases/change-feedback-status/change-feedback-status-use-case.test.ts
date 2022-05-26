import { FeedbackRepositoryInterface } from "../../repositories/feedback-repository-interface";
import MockFeedbackRepository from "../../repositories/mocks/mock-feedback-repository";
import { ChangeFeedbackStatusUseCase } from "./change-feedback-status-use-case";

let repository: FeedbackRepositoryInterface;
let repositoryCreateSpy: MockFeedbackRepository;
let changeFeedbackStatusUseCase: ChangeFeedbackStatusUseCase;

describe("Change Feedback Status UseCase", () => {
  beforeEach(() => {
    repository = new MockFeedbackRepository();
    repositoryCreateSpy = repository as MockFeedbackRepository;
    changeFeedbackStatusUseCase = new ChangeFeedbackStatusUseCase(repository);

    repositoryCreateSpy.feedback = [
      {
        id: "1",
        type: "BUG",
        comment: "comment bug test",
        status: "PENDENT",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  });

  it("should change feedback status", async () => {
    const feedback = await changeFeedbackStatusUseCase.execute("1", "APPROVED");
    expect(feedback.status).toBe("APPROVED");
    expect(feedback.id).toBe("1");
    expect(feedback).toBeTruthy();
  });
});
