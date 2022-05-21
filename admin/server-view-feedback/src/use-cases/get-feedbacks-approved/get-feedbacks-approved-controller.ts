import { Request, Response } from "express";
import { GetFeedbacksApprovedUseCase } from "./get-feedbacks-approved-use-case";

export class GetFeedbacksApprovedController {
  constructor(
    private readonly getFeedbacksApprovedUseCase: GetFeedbacksApprovedUseCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const feedbacks = await this.getFeedbacksApprovedUseCase.execute();
      return res.status(200).json(feedbacks);
    } catch (err) {
      return res.status(400).json({
        error: err || "Unexpected error.",
      });
    }
  }
}
