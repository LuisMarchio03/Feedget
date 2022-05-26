import { Feedback } from "../../infra/domain/feedback";
import { FeedbackRepositoryInterface } from "../../repositories/feedback-repository-interface";

export class ChangeFeedbackStatusUseCase {
  constructor(private feedbackRepository: FeedbackRepositoryInterface) {}

  async execute(id: string, status: string): Promise<Feedback> {
    return await this.feedbackRepository.changeFeedbackStatus(id, status);
  }
}
