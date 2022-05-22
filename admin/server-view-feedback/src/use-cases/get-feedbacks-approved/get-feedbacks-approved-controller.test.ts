import { PrismaClient } from "@prisma/client";
import request from "supertest";
import { app } from "../../infra/http/app";

describe("Get Feedbacks Approved Controller", () => {
  const prismaService = new PrismaClient();

  beforeAll(async () => {
    await prismaService.feedback.create({
      data: {
        type: "BUG",
        comment: "Test comment",
        status: "APPROVED",
      },
    });

    await prismaService.feedback.create({
      data: {
        type: "BUG",
        comment: "Test comment",
        status: "APPROVED",
      },
    });

    await prismaService.feedback.create({
      data: {
        type: "BUG",
        comment: "Test comment",
        status: "REJECTED",
      },
    });
  });

  afterAll(async () => {
    const deleteFeedbacks = prismaService.feedback.deleteMany();
    await prismaService.$transaction([deleteFeedbacks]);
    await prismaService.$disconnect();
  });

  it("should be able to return all feedbacks approved", async () => {
    const response = await request(app).get("/feedbacks/approved").send();
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].status).toBe("APPROVED");
    expect(response.body[1].status).toBe("APPROVED");
  });
});
