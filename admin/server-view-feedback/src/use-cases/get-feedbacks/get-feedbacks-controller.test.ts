import { PrismaClient } from "@prisma/client";
import request from "supertest";
import { app } from "../../infra/http/app";

let prismaService: PrismaClient;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    prismaService = new PrismaClient();

    await prismaService.feedback.create({
      data: {
        type: "BUG",
        comment: "Test comment",
        status: "PENDENT",
      },
    });
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it("should be able to return all feedbacks", async () => {
    const response = await request(app).get("/feedbacks").send();
    expect(response.status).toBe(200);
  });
});
