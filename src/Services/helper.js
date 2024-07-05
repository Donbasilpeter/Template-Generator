 
import { ReactAppAgent,ReactProjectAgent,ReactAppReviewerAgent,ReactAppUpdaterAgent } from "../LLM/agents";

function processInput(input) {
    // Remove the code block markers
    const processedInput = input.replace(/```[\s\S]*?\n|```/g, '').trim();
    return processedInput;
  }



export const codeFromScratch =async (description,apiKey)=>{
    let response = ""
    response = await ReactProjectAgent(description,apiKey)
    response = await ReactAppAgent(description,processInput(response),apiKey)
    response = await ReactAppReviewerAgent(description,processInput(response),apiKey)
    response = JSON.parse(processInput(response))
    return response
  }
export const codeUpdater =async (pastDescriptions,description,template,apiKey)=>{
    const  requirement = pastDescriptions.join('\n') + "\n " +  description
    let response = ""
    response = await ReactAppUpdaterAgent(description,JSON.stringify(template),apiKey)
    response = await ReactAppReviewerAgent(requirement,processInput(response),apiKey)
    response = JSON.parse(processInput(response))
    return response
  }