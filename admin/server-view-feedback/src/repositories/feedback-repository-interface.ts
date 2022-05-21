import { Feedback } from "../infra/domain/feedback";

export interface CreateFeedbackSpyDTO {
  id: string;
  type: string;
  comment: string;
  screenshot?: string;
  responsible?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FeedbackRepositoryInterface {
  getFeedbacks(): Promise<Feedback[]>;
  getFeedback(id: string): Promise<Feedback>;
  getFeedbacksRejected(): Promise<Feedback[]>;
  getFeedbacksPendent(): Promise<Feedback[]>;
  getFeedbacksApproved(): Promise<Feedback[]>;
  changeFeedbackStatus(id: string, status: string): Promise<Feedback>;
}
