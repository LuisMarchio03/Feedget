import MockFeedbackRepository from "../../repositories/mocks/mock-feedback-repository";
import { FeedbackRepositoryInterface } from "./../../repositories/feedback-repository-interface";
import { PushFeedbackUseCase } from "./push-feedback-usecase";

const repository: FeedbackRepositoryInterface = new MockFeedbackRepository();
const pushFeedback = new PushFeedbackUseCase(repository);

describe("push feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      pushFeedback.execute({
        type: "BUG",
        comment: "example comment",
        screenshot: "data:image/png;base64,fdsfsdfdsdfsffdfsfsdfdsdds",
      })
    ).resolves.not.toThrow();

    expect(repository.createFeedback).toHaveBeenCalled();
  });

  it("should not be able to submit a feedback without type", async () => {
    await expect(
      pushFeedback.execute({
        type: "",
        comment: "example comment",
        screenshot: "data:image/png;base64,fdsfsdfdsdfsffdfsfsdfdsdds",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback without comment", async () => {
    await expect(
      pushFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,fdsfsdfdsdfsffdfsfsdfdsdds",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback with an invalid screenshot", async () => {
    await expect(
      pushFeedback.execute({
        type: "BUG",
        comment: "example feedback comment",
        screenshot: "teste.jpg",
      })
    ).rejects.toThrow();
  });
});
