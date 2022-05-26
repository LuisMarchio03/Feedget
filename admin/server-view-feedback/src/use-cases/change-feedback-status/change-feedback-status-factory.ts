import { PrismaFeedbackRepository } from "../../repositories/prisma/prisma-feedback-repository";
import { ChangeFeedbackStatusController } from "./change-feedback-status-controller";
import { ChangeFeedbackStatusUseCase } from "./change-feedback-status-use-case";

export const ChangeFeedbackStatus = () => {
  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const changeFeedbackStatusUseCase = new ChangeFeedbackStatusUseCase(
    prismaFeedbackRepository
  );
  const changeFeedbackStatusController = new ChangeFeedbackStatusController(
    changeFeedbackStatusUseCase
  );
  return changeFeedbackStatusController;
};
