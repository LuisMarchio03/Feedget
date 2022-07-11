import { Request, Response } from "express";
import { RabbitMQServer } from "../../services/rabbitmqserver";
import { PushFeedbackUseCase } from "./push-feedback-usecase";

export class PushFeedbackController {
  constructor(private readonly pushFeedbackUseCase: PushFeedbackUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const rabbitMQServer = new RabbitMQServer();
      await rabbitMQServer.start();

      let response;

      await rabbitMQServer.consumer("feedback", (message) => {
        response = message;
      });

      const feedback = await this.pushFeedbackUseCase.execute(
        JSON.parse(response)
      );

      return res.status(201).json(feedback);
    } catch (err) {
      return res.status(400).json({
        error: err || "Unexpected error.",
      });
    }
  }
}
