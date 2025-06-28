import axios from "axios";
import { apiError } from "../utils/apiError.js";

export const summarizeTask = async (task, subtasks) => {
  try {
    const cleanTask = task?.trim() || "Untitled Task";

    const formattedSubtasks =
      subtasks
        ?.filter((st) => !!st?.content)
        .map((st, i) => `${i + 1}. ${st.content}`)
        .join("\n") || "None";

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          {
            role: "user",
            content: `You are a helpful assistant that summarizes any kind of user task containing multiple subtasks — whether it's a work-related assignment, a to-do list, a cooking recipe, or a set of ambiguous personal tasks.

            Read the following content and generate a concise, human-friendly summary that clearly communicates the main purpose of the task.

            If the task is informal or personal, keep the tone friendly.
            If it's work-related, be concise and professional.
            Do not add any details that are not present in the input.

            Task: ${cleanTask}
            Subtasks: ${formattedSubtasks}`,
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
    throw new apiError(500, "Failed to summarize task via AI");
  }
};
