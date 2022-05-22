import { PrismaClient } from "@prisma/client";
import request from "supertest";
import { app } from "../../infra/http/app";

describe("Create Category Controller", () => {
  const prismaService = new PrismaClient();

  beforeAll(async () => {
    await prismaService.feedback.create({
      data: {
        type: "BUG",
        comment: "Test comment",
        status: "PENDENT",
      },
    });
  });

  afterAll(async () => {
    const deleteFeedbacks = prismaService.feedback.deleteMany();
    await prismaService.$transaction([deleteFeedbacks]);
    await prismaService.$disconnect();
  });

  it("should be able to return all feedbacks", async () => {
    const response = await request(app).get("/feedbacks").send();
    expect(response.status).toBe(200);
  });
});
