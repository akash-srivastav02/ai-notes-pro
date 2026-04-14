import OpenAI from "openai";

export const summarizeWithAI = async (text) => {
  try {
    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `Summarize this in bullet points:\n\n${text}`,
        },
      ],
      temperature: 0.5,
    });

    return response.choices[0].message.content;

  } catch (error) {
    console.error("AI ERROR:", error.message);
    throw new Error("AI summarization failed");
  }
};