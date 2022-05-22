import { PrismaClient } from "@prisma/client";
import { PrismaFeedbackRepository } from "./prisma-feedback-repository";

let repository: PrismaFeedbackRepository;
let feedbackOne;

describe("Prisma Feedback Repository", () => {
  const prisma = new PrismaClient();

  beforeAll(async () => {
    repository = new PrismaFeedbackRepository();

    feedbackOne = await prisma.feedback.create({
      data: {
        type: "BUG",
        comment: "Test comment",
        status: "PENDENT",
      },
    });

    await prisma.feedback.create({
      data: {
        type: "BUG",
        comment: "Test comment",
        status: "APPROVED",
      },
    });

    await prisma.feedback.create({
      data: {
        type: "BUG",
        comment: "Test comment",
        status: "REJECTED",
      },
    });
  });

  afterAll(async () => {
    const deleteFeedbacks = prisma.feedback.deleteMany();
    await prisma.$transaction([deleteFeedbacks]);
    await prisma.$disconnect();
  });

  it("should be able to return all feedbacks", async () => {
    const feedbacks = await repository.getFeedbacks();
    expect(feedbacks).toHaveLength(3);
  });

  it("should be able to return a feedback by id", async () => {
    const feedback = await repository.getFeedback(feedbackOne.id);
    expect(feedback).toBeDefined();
    expect(feedback.id).toBe(feedbackOne.id);
  });

  it("should be able to return feedbacks by status pendent", async () => {
    const feedbacks = await repository.getFeedbacksPendent();
    expect(feedbacks).toHaveLength(1);
    expect(feedbacks[0].status).toBe("PENDENT");
  });

  it("should be able to return feedbacks by status approved", async () => {
    const feedbacks = await repository.getFeedbacksApproved();
    expect(feedbacks).toHaveLength(1);
    expect(feedbacks[0].status).toBe("APPROVED");
  });

  it("should be able to return feedbacks by status rejected", async () => {
    const feedbacks = await repository.getFeedbacksRejected();
    expect(feedbacks).toHaveLength(1);
    expect(feedbacks[0].status).toBe("REJECTED");
  });

  it("should be able to change feedback status", async () => {
    const feedback = await repository.changeFeedbackStatus(
      feedbackOne.id,
      "APPROVED"
    );
    expect(feedback.status).toBe("APPROVED");
    expect(feedback.id).toBe(feedbackOne.id);
  });
});
