// import { react_developer_human_prompt } from "../LLM/prompts";
import { codeFromScratch,codeUpdater } from "./helper.js";



// export const submitDescription = async (description,template) => {
//   try {
//     let response = ""
//     if(template!=="") response = await ReactComponentAgent(react_developer_human_prompt + description + template)
//     else response = await ReactComponentAgent( description)
//     return processInput(response);
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };


export const submitDescription = async (description,template) => {
  try {
    let response = ""
    if(template=="") response = await codeFromScratch(description)
    else response = await codeUpdater(description,template)
    return response 
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

