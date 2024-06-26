 
import { ReactAppAgent,ReactProjectAgent,ReactAppReviewerAgent,ReactAppUpdaterAgent } from "../LLM/agents";

function processInput(input) {
    // Remove the code block markers
    const processedInput = input.replace(/```[\s\S]*?\n|```/g, '').trim();
    return processedInput;
  }



export const codeFromScratch =async (description)=>{
    let response = ""
    response = await ReactProjectAgent(description)
    response = await ReactAppAgent(processInput(response))
    response = await ReactAppReviewerAgent(description,processInput(response))
    response = JSON.parse(processInput(response))
    return response
  }
export const codeUpdater =async (pastDescriptions,description,template)=>{
    const  requirement = pastDescriptions.join('\n') + "\n " +  description
    let response = ""
    response = await ReactAppUpdaterAgent(description,JSON.stringify(template))
    response = await ReactAppReviewerAgent(requirement,processInput(response))
    response = JSON.parse(processInput(response))
    return response
  }