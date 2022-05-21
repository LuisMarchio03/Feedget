import { Request, Response } from "express";
import { GetFeedbacksPendentUseCase } from "./get-feedbacks-pendent-use-case";

export class GetFeedbacksPendentController {
  constructor(
    private readonly getFeedbacksPendentUseCase: GetFeedbacksPendentUseCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const feedbacks = await this.getFeedbacksPendentUseCase.execute();
      return res.status(200).json(feedbacks);
    } catch (err) {
      return res.status(400).json({
        error: err || "Unexpected error.",
      });
    }
  }
}
