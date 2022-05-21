import { PrismaFeedbackRepository } from "../../repositories/prisma/prisma-feedback-repository";
import { GetFeedbacksController } from "./get-feedbacks-controller";
import { GetFeedbacksUseCase } from "./get-feedbacks-use-case";

export const GetFeedbacksFactory = () => {
  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const getFeedbacksUseCase = new GetFeedbacksUseCase(prismaFeedbackRepository);
  const getFeedbacksController = new GetFeedbacksController(
    getFeedbacksUseCase
  );
  return getFeedbacksController;
};
