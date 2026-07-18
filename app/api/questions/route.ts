import { strict_output } from "@/lib/ai";
import { getQuestionsSchema } from "@/schemas/Question.schema";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function POST(req: Request) {
  try {

    const body = await req.json();
    const { amount, topic, type } = getQuestionsSchema.parse(body);
    let questions: any;
    if (type === "open_ended") {
      questions = await strict_output(
        "You are a helpful AI that is able to generate a pair of question and answers, the length of each answer should not be more than 15 words, store all the pairs of answers and questions in a JSON array",
        new Array(amount).fill(
          `You are to generate a random hard open-ended questions about ${topic}`
        ),
        {
          question: "question",
          answer: "answer with max length of 15 words",
        }
      );
    } else if (type === "mcq") {
   questions = await strict_output(
  "You are a helpful AI that generates MCQ questions. You must return EXACTLY 3 wrong options and 1 correct answer. Never add extra options. Never repeat the answer in the options.",
  new Array(amount).fill(
    `Generate a hard MCQ question about ${topic}. Return ONLY these fields: question, answer, option1, option2, option3. option1/2/3 must be WRONG answers, different from the answer field.`
  ),
  {
    question: "question",
    answer: "correct answer with max length of 15 words",
    option1: "wrong option, max 15 words, must NOT equal answer",
    option2: "wrong option, max 15 words, must NOT equal answer",
    option3: "wrong option, max 15 words, must NOT equal answer",
  }
);
       console.log("strict_output result:", JSON.stringify(questions));
    }
    return NextResponse.json(
      {
        questions: questions,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues },
        {
          status: 400,
        }
      );
    } else {
      console.error("elle gpt error", error);
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        {
          status: 500,
        }
      );
    }
  }
}