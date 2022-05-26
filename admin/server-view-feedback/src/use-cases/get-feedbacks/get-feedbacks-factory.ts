import { PrismaFeedbackRepository } from "../../repositories/prisma/prisma-feedback-repository";
import { KafkaService } from "../../services/kafka-service";
import { GetFeedbacksController } from "./get-feedbacks-controller";
import { GetFeedbacksUseCase } from "./get-feedbacks-use-case";

export const GetFeedbacksFactory = () => {
  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const kafkaService = new KafkaService();
  const getFeedbacksUseCase = new GetFeedbacksUseCase(
    prismaFeedbackRepository,
    kafkaService
  );
  const getFeedbacksController = new GetFeedbacksController(
    getFeedbacksUseCase
  );
  return getFeedbacksController;
};
