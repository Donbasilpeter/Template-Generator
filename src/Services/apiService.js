import { ReactAppAgent, ReactComponentAgent,ReactProjectAgent,ReactAppReviewerAgent } from "../LLM/agents";
// import { react_developer_human_prompt } from "../LLM/prompts";
import { processInput } from "./helper.js";



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
     response = await ReactProjectAgent( description)
     console.log(JSON.parse(processInput(response)))
     response = await ReactAppAgent(processInput(response))
     response = await ReactAppReviewerAgent(description,processInput(response))
     response = JSON.parse(processInput(response))
     console.log(response)
     return response
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

