import { Feedback } from "../infra/domain/feedback";

export interface FeedbackRepositoryInterface {
  getFeedbacks(): Promise<Feedback[]>;
  getFeedback(id: string): Promise<Feedback>;
  getFeedbacksRejected(): Promise<Feedback[]>;
  getFeedbacksPendent(): Promise<Feedback[]>;
  getFeedbacksApproved(): Promise<Feedback[]>;
  changeFeedbackStatus(id: string, status: string): Promise<Feedback>;
}
