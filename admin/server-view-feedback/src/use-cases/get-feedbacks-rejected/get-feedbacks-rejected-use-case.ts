import { Feedback } from "../../infra/domain/feedback";
import { FeedbackRepositoryInterface } from "../../repositories/feedback-repository-interface";

export class GetFeedbacksRejectedUseCase {
  constructor(
    private readonly feedbackRepository: FeedbackRepositoryInterface
  ) {}

  async execute(): Promise<Feedback[]> {
    return await this.feedbackRepository.getFeedbacksRejected();
  }
}
