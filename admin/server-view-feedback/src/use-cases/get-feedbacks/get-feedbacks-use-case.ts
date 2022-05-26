import { Feedback } from "../../infra/domain/feedback";
import { FeedbackRepositoryInterface } from "../../repositories/feedback-repository-interface";
import { KafkaService } from "../../services/kafka-service";

export class GetFeedbacksUseCase {
  constructor(
    private readonly feedbackRepository: FeedbackRepositoryInterface,
    private readonly kafkaService: KafkaService
  ) {}

  async execute(): Promise<Feedback[]> {
    this.kafkaService.execute();
    return await this.feedbackRepository.getFeedbacks();
  }
}
