-- CreateEnum
CREATE TYPE "GAME_TYPE" AS ENUM ('mcq', 'open_ended');

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "topic" VARCHAR(250) NOT NULL,
    "timeCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "timeEnded" TIMESTAMP(3),
    "gameType" "GAME_TYPE" NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questions" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "options" JSONB,
    "percentageCorrect" DOUBLE PRECISION,
    "isCorrect" BOOLEAN,
    "questionType" "GAME_TYPE" NOT NULL,
    "userAnswer" TEXT,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic_Count" (
    "id" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "Topic_Count_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "userId" ON "Game"("userId");

-- CreateIndex
CREATE INDEX "Questions_gameId_idx" ON "Questions"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_Count_topic_key" ON "Topic_Count"("topic");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
