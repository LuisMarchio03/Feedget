import { PrismaClient } from "@prisma/client";
import { Feedback } from "../../infra/domain/feedback";
import { FeedbackRepositoryInterface } from "../feedback-repository-interface";

export class PrismaFeedbackRepository implements FeedbackRepositoryInterface {
  private prismaClient = new PrismaClient();

  async getFeedbacks(): Promise<Feedback[]> {
    const feedbacks = await this.prismaClient.feedback.findMany({});
    return feedbacks;
  }
  getFeedback(id: string): Promise<Feedback> {
    throw new Error("Method not implemented.");
  }
  getFeedbacksRejected(): Promise<Feedback[]> {
    throw new Error("Method not implemented.");
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
  changeFeedbackStatus(id: string, status: string): Promise<Feedback> {
    throw new Error("Method not implemented.");
  }
}
