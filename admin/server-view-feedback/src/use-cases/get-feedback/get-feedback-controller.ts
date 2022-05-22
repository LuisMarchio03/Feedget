import { Request, Response } from "express";
import { GetFeedbackUseCase } from "./get-feedback-use-case";

export class GetFeedbackController {
  constructor(private readonly getFeedbackUseCase: GetFeedbackUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const feedback = await this.getFeedbackUseCase.execute(req?.params?.id);
      return res.status(200).json(feedback);
    } catch (err) {
      return res.status(400).json({
        error: err || "Unexpected error.",
      });
    }
  }
}
