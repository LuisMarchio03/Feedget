import { prisma } from "../../prisma";
import {
  FeedbackDTO,
  FeedbacksCreateDTO,
  FeedbacksRepository,
} from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({
    type,
    comment,
    screenshot,
  }: FeedbacksCreateDTO): Promise<FeedbackDTO> {
    return (await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    })) as FeedbackDTO;
  }
}
