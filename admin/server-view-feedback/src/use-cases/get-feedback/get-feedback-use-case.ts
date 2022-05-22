import { Feedback } from "../../infra/domain/feedback";
import { FeedbackRepositoryInterface } from "../../repositories/feedback-repository-interface";

export class GetFeedbackUseCase {
  constructor(
    private readonly feedbackRepository: FeedbackRepositoryInterface
  ) {}

  async execute(id: string): Promise<Feedback> {
    return await this.feedbackRepository.getFeedback(id);
  }
}
