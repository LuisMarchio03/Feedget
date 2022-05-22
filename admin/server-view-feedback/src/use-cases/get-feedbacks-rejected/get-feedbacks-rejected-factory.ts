import { PrismaFeedbackRepository } from "../../repositories/prisma/prisma-feedback-repository";
import { GetFeedbacksRejectedController } from "./get-feedbacks-rejected-controller";
import { GetFeedbacksRejectedUseCase } from "./get-feedbacks-rejected-use-case";

export const GetFeedbacksRejectedFactory = () => {
  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const getFeedbacksRejectedUseCase = new GetFeedbacksRejectedUseCase(
    prismaFeedbackRepository
  );
  const getFeedbacksRejectedController = new GetFeedbacksRejectedController(
    getFeedbacksRejectedUseCase
  );
  return getFeedbacksRejectedController;
};
