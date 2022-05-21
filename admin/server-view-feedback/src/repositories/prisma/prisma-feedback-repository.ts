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
  getFeedbacksPendent(): Promise<Feedback[]> {
    throw new Error("Method not implemented.");
  }
  getFeedbacksApproved(): Promise<Feedback[]> {
    throw new Error("Method not implemented.");
  }
  changeFeedbackStatus(id: string, status: string): Promise<Feedback> {
    throw new Error("Method not implemented.");
  }
}
