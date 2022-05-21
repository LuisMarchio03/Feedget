import { Feedback } from "../../infra/domain/feedback";
import { FeedbackRepositoryInterface } from "../../repositories/feedback-repository-interface";

export class GetFeedbacksPendentUseCase {
  constructor(
    private readonly feedbackRepository: FeedbackRepositoryInterface
  ) {}

  async execute(): Promise<Feedback[]> {
    return await this.feedbackRepository.getFeedbacksPendent();
  }
}
