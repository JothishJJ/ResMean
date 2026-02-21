import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new Response("No file uploaded", { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const { object: analysis } = await generateObject({
      model: google("gemini-2.5-flash"), // Updated model name if necessary, 2.5 might be a typo in previous version
      schema: z.object({
        score: z.number().min(0).max(100),
        matchLevel: z.string().describe("e.g., 'Strong match for Senior Developer roles'"),
        summary: z.string().describe("A brief overall summary of the resume."),
        improvements: z.array(z.string()).min(3).describe("A list of at least 3 critical improvements."),
        strengths: z.array(z.string()).describe("A list of key strengths found in the resume."),
        atsOptimization: z.object({
          score: z.number(),
          feedback: z.string()
        }),
        keywordSuggestions: z.array(z.string()).describe("Important keywords missing or that should be highlighted.")
      }),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze the attached resume and provide a structured assessment., make sure the score is out of 100, atsOptimization score is also out of 100",
            },
            {
              type: "file",
              data: buffer,
              mediaType: "application/pdf",
            },
          ],
        },
      ],
    });

    return Response.json(analysis);
  } catch (error) {
    console.error("Analysis failed:", error);
    return new Response("Failed to analyze resume", { status: 500 });
  }
}
