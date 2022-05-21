import { Request, Response } from "express";
import { GetFeedbacksUseCase } from "./get-feedbacks-use-case";

export class GetFeedbacksController {
  constructor(private readonly getFeedbacksUseCase: GetFeedbacksUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const feedbacks = await this.getFeedbacksUseCase.execute();
      return res.status(200).json(feedbacks);
    } catch (err) {
      return res.status(400).json({
        error: err || "Unexpected error.",
      });
    }
  }
}
