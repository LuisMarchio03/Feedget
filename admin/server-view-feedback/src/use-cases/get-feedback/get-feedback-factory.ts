import { PrismaFeedbackRepository } from "../../repositories/prisma/prisma-feedback-repository";
import { GetFeedbackController } from "./get-feedback-controller";
import { GetFeedbackUseCase } from "./get-feedback-use-case";

export const GetFeedbackFactory = () => {
  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const getFeedbackUseCase = new GetFeedbackUseCase(prismaFeedbackRepository);
  const getFeedbackController = new GetFeedbackController(getFeedbackUseCase);
  return getFeedbackController;
};
