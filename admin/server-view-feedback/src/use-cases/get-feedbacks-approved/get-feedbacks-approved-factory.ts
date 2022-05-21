import { PrismaFeedbackRepository } from "../../repositories/prisma/prisma-feedback-repository";
import { GetFeedbacksApprovedController } from "./get-feedbacks-approved-controller";
import { GetFeedbacksApprovedUseCase } from "./get-feedbacks-approved-use-case";

export const GetFeedbacksApprovedFactory = () => {
  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const getFeedbacksApprovedUseCase = new GetFeedbacksApprovedUseCase(
    prismaFeedbackRepository
  );
  const getFeedbacksApprovedController = new GetFeedbacksApprovedController(
    getFeedbacksApprovedUseCase
  );
  return getFeedbacksApprovedController;
};
