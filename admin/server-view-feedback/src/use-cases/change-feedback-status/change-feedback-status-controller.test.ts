/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { PrismaClient } from "@prisma/client";
import request from "supertest";
import { Feedback } from "../../infra/domain/feedback";
import { app } from "../../infra/http/app";

describe("Change Feedback Status Controller", () => {
  let feedbackCreated: Feedback;
  const prismaService = new PrismaClient();

  beforeAll(async () => {
    feedbackCreated = await prismaService.feedback.create({
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

  it("should be able to update status for feedback", async () => {
    const response = await request(app)
      .put(`/feedback/${feedbackCreated.id}`)
      .send({ status: "APPROVED" });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
    expect(response.body.id).toBe(feedbackCreated.id);
    expect(response.body.status).toBe("APPROVED");
  });
});
