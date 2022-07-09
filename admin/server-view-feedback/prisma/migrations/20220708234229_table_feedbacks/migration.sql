-- CreateTable
CREATE TABLE "feedbacks" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "screenshot" TEXT,
    "responsible" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feedbacks_pkey" PRIMARY KEY ("id")
);
