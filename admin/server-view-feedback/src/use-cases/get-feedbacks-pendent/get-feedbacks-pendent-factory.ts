import { PrismaFeedbackRepository } from "../../repositories/prisma/prisma-feedback-repository";
import { GetFeedbacksPendentController } from "./get-feedbacks-pendent-controller";
import { GetFeedbacksPendentUseCase } from "./get-feedbacks-pendent-use-case";

export const GetFeedbacksPendentFactory = () => {
  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const getFeedbacksPendentUseCase = new GetFeedbacksPendentUseCase(
    prismaFeedbackRepository
  );
  const getFeedbacksPendentController = new GetFeedbacksPendentController(
    getFeedbacksPendentUseCase
  );
  return getFeedbacksPendentController;
};
