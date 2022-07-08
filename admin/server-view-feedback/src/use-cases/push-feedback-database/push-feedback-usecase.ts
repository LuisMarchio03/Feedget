import { FeedbackRepositoryInterface } from "../../repositories/feedback-repository-interface";
import { RabbitMQServer } from "../../services/rabbitmqserver";

interface PushFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class PushFeedbackUseCase {
  constructor(
    private readonly feedbackRepository: FeedbackRepositoryInterface
  ) {}

  async execute(request: PushFeedbackUseCaseRequest) {
    console.log("ENTROU");

    const { type, comment, screenshot } = request;

    if (!type) return;

    if (!comment) return;

    await this.feedbackRepository.createFeedback({
      type,
      comment,
      screenshot,
    });
  }
}
