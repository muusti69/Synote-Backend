import axios from "axios";
import { apiError } from "../utils/apiError.js";

export const summarizeNote = async (noteTitle, noteContent) => {
  try {
    console.log((process.env.OPEN_ROUTER_API_KEY))
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          {
            role: "user",
            content: `You are a helpful assistant that summarizes any kind of user note — whether it's a work update, to-do list, journal entry, or a set of reminders.
            Read the following text and create a short, human-friendly summary that clearly communicates what the note is about. If the note is informal or personal, keep the tone friendly. If it's a work-related update, be concise and professional. Do not add details that are not in the input.

            Title of Note : ${noteTitle?.trim()}
            Content of Note: ${noteContent?.trim()}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "X-Title": "AI Knowledge Hub",
        },
      }
    );

    const summary = response.data.choices[0]?.message?.content;

    if (!summary) {
      throw new apiError(500, "AI response missing or malformed");
    }

    return summary;
  } catch (error) {
    throw new apiError(500, "Failed to summarize note via AI");
  }
};
