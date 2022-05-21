import { PrismaClient } from "@prisma/client";
import request from "supertest";
import { app } from "../../infra/http/app";

let prismaService: PrismaClient;

describe("Get Feedbacks pendent Controller", () => {
  beforeAll(async () => {
    prismaService = new PrismaClient();

    await prismaService.$connect();

    await prismaService.feedback.create({
      data: {
        type: "BUG",
        comment: "Test comment",
        status: "PENDENT",
      },
    });

    await prismaService.feedback.create({
      data: {
        type: "BUG",
        comment: "Test comment",
        status: "PENDENT",
      },
    });

    await prismaService.feedback.create({
      data: {
        type: "BUG",
        comment: "Test comment",
        status: "APPROVED",
      },
    });
  });

  afterAll(async () => {
    await prismaService.feedback.deleteMany({});
    await prismaService.$disconnect();
  });

  it("should be able to return all feedbacks pendent", async () => {
    const response = await request(app).get("/feedbacks/pendent").send();
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].status).toBe("PENDENT");
    expect(response.body[1].status).toBe("PENDENT");
  });
});
