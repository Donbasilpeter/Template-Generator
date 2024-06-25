import { ReactComponentAgent } from "../LLM/agents";
import { react_developer_human_prompt } from "../LLM/prompts";



export const submitDescription = async (description,template) => {
  try {
    let response = ""
    if(template!=="") response = await ReactComponentAgent(react_developer_human_prompt + description + template)
    else response = await ReactComponentAgent( description)
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
