import { PrismaFeedbackRepository } from "./../../repositories/prisma/prisma-feedback-repository";
import { PushFeedbackController } from "./push-feedback-controller";
import { PushFeedbackUseCase } from "./push-feedback-usecase";

export const PushFeedbackFactory = () => {
  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const pushFeedbackUseCase = new PushFeedbackUseCase(prismaFeedbackRepository);
  const pushFeedbackController = new PushFeedbackController(
    pushFeedbackUseCase
  );
  return pushFeedbackController;
};
