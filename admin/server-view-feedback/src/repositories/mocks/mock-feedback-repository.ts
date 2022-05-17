import { Feedback } from "../../infra/domain/feedback";
import { FeedbackRepositoryInterface } from "../feedback-repository-interface";

export class MockFeedbackRepository implements FeedbackRepositoryInterface {
  private feedback: Feedback[] = [];

  getFeedbacks(): Promise<Feedback[]> {
    return Promise.resolve(this.feedback);
  }
  getFeedback(id: string): Promise<Feedback> {
    return Promise.resolve(
      this.feedback.find((feedback) => feedback.id === id)
    );
  }
  getFeedbacksRejected(): Promise<Feedback[]> {
    return Promise.resolve(
      this.feedback.filter((feedback) => feedback.status === "REJECTED")
    );
  }
  getFeedbacksPendent(): Promise<Feedback[]> {
    return Promise.resolve(
      this.feedback.filter((feedback) => feedback.status === "PENDENT")
    );
  }
  getFeedbacksApproved(): Promise<Feedback[]> {
    return Promise.resolve(
      this.feedback.filter((feedback) => feedback.status === "APPROVED")
    );
  }
  changeFeedbackStatus(id: string, status: string): Promise<Feedback> {
    const feedback = this.feedback.find((feedback) => feedback.id === id);
    feedback.status = status;

    return Promise.resolve(feedback);
  }
}
