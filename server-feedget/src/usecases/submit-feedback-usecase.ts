import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";
import { KafkaService } from "../services/kafka-service";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
    private kafka: KafkaService
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type) throw new Error("Type is required");

    if (!comment) throw new Error("Comment is required");

    if (screenshot && !screenshot.startsWith("data:image/png;base64"))
      throw new Error("Invalid screenshot format");

    const submitFeedback = await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: "Novo Feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `<img src="${screenshot}"/>`,
        `</div>`,
      ].join("\n"),
    });

    await this.kafka.execute({
      id: submitFeedback.id,
      type: submitFeedback.type,
      comment: submitFeedback.comment,
      screenshot: submitFeedback.screenshot,
    });
  }
}
