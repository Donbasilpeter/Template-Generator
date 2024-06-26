// import { react_developer_human_prompt } from "../LLM/prompts";
import { codeFromScratch,codeUpdater } from "./helper.js";


export const submitDescription = async (pastDescriptions,description,template) => {
  try {
    let response = ""
    if(template=="") response = await codeFromScratch(description)
    else response = await codeUpdater(pastDescriptions,description,template)
    return response 
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

