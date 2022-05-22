import { Request, Response } from "express";
import { GetFeedbacksRejectedUseCase } from "./get-feedbacks-rejected-use-case";

export class GetFeedbacksRejectedController {
  constructor(
    private readonly getFeedbacksRejectedUseCase: GetFeedbacksRejectedUseCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const feedbacks = await this.getFeedbacksRejectedUseCase.execute();
      return res.status(200).json(feedbacks);
    } catch (err) {
      return res.status(400).json({
        error: err || "Unexpected error.",
      });
    }
  }
}
