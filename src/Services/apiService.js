import { ReactComponentAgent } from "../LLM/agents";


export const submitDescription = async (description) => {
  try {
    const response = await ReactComponentAgent(description)
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
