import { Request, Response } from "express";
import { ChangeFeedbackStatusUseCase } from "./change-feedback-status-use-case";

export class ChangeFeedbackStatusController {
  constructor(
    private readonly changeFeedbackStatusUseCase: ChangeFeedbackStatusUseCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { status } = req.body;
      const { id } = req.params;

      const feedback = await this.changeFeedbackStatusUseCase.execute(
        id,
        status
      );

      return res.status(200).json(feedback);
    } catch (err) {
      return res.status(400).json({
        message: err.message || "Unexpected error.",
      });
    }
  }
}
