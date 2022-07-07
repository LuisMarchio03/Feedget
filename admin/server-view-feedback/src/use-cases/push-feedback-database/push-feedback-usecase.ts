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
    const { type, comment, screenshot } = request;

    if (!type) throw new Error("Type is required");

    if (!comment) throw new Error("Comment is required");

    if (screenshot && !screenshot.startsWith("data:image/png;base64"))
      throw new Error("Invalid screenshot format");

    const submitFeedback = await this.feedbackRepository.createFeedback({
      type,
      comment,
      screenshot,
    });
  }
}
