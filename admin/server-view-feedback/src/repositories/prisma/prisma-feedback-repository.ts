import { PrismaClient } from "@prisma/client";
import { Feedback } from "../../infra/domain/feedback";
import { FeedbackRepositoryInterface } from "../feedback-repository-interface";

interface PushFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class PrismaFeedbackRepository implements FeedbackRepositoryInterface {
  private prismaClient = new PrismaClient();

  async getFeedbacks(): Promise<Feedback[]> {
    const feedbacks = await this.prismaClient.feedback.findMany({});
    return feedbacks;
  }
  async getFeedback(id: string): Promise<Feedback> {
    const feedbacks = await this.prismaClient.feedback.findUnique({
      where: {
        id,
      },
    });
    return feedbacks;
  }
  async getFeedbacksRejected(): Promise<Feedback[]> {
    const feedbacks = await this.prismaClient.feedback.findMany({
      where: {
        status: "REJECTED",
      },
    });
    return feedbacks;
  }
  async getFeedbacksPendent(): Promise<Feedback[]> {
    const feedbacks = await this.prismaClient.feedback.findMany({
      where: {
        status: "PENDENT",
      },
    });
    return feedbacks;
  }
  async getFeedbacksApproved(): Promise<Feedback[]> {
    const feedbacks = await this.prismaClient.feedback.findMany({
      where: {
        status: "APPROVED",
      },
    });
    return feedbacks;
  }
  async changeFeedbackStatus(id: string, status: string): Promise<Feedback> {
    const feedback = await this.prismaClient.feedback.update({
      where: {
        id,
      },
      data: {
        status: status,
      },
    });
    return feedback;
  }
  createFeedback({
    comment,
    type,
    screenshot,
  }: PushFeedbackUseCaseRequest): Promise<Feedback> {
    const feedbackCreated = this.prismaClient.feedback.create({
      data: {
        comment,
        type,
        screenshot,
        status: "PENDENT",
      },
    });
    return feedbackCreated;
  }
}
