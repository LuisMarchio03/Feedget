/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { PrismaClient } from "@prisma/client";
import request from "supertest";
import { app } from "../../infra/http/app";

describe("Get Feedback Controller", () => {
  let createdOne;
  const prismaService = new PrismaClient();

  beforeAll(async () => {
    createdOne = await prismaService.feedback.create({
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
  });

  afterAll(async () => {
    const deleteFeedback = prismaService.feedback.deleteMany();
    await prismaService.$transaction([deleteFeedback]);
    await prismaService.$disconnect();
  });

  it("should be able to return one feedback", async () => {
    const response = await request(app)
      .get(`/feedback/${createdOne.id}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
    expect(response.body.id).toBe(createdOne.id);
  });
});
