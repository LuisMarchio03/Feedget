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

interface PushFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbackRepositoryInterface {
  createFeedback(feedback: PushFeedbackUseCaseRequest): Promise<Feedback>;
  getFeedbacks(): Promise<Feedback[]>;
  getFeedback(id: string): Promise<Feedback>;
  getFeedbacksRejected(): Promise<Feedback[]>;
  getFeedbacksPendent(): Promise<Feedback[]>;
  getFeedbacksApproved(): Promise<Feedback[]>;
  changeFeedbackStatus(id: string, status: string): Promise<Feedback>;
}
