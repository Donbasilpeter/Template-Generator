 
import { ReactAppAgent,ReactProjectAgent,ReactAppUpdaterAgent } from "../LLM/agents";


function processInput(input) {
  // Remove the code block markers
  const processedInput = input.replace(/```[\s\S]*?\n|```/g, '').trim();
  return processedInput;
}

export const codeFromScratch =async (description,apiKey)=>{
    let response = ""
    response = await ReactProjectAgent(description,apiKey)
    response = await ReactAppAgent(description,JSON.stringify(response),apiKey)
    response = JSON.parse(processInput(response))
    return response
  }
export const codeUpdater =async (pastDescriptions,description,template,apiKey)=>{
    const  requirement = "The requirement for input code : " + pastDescriptions.join('\n') + "\n " + "New requirement  : " + description
    let response = ""
    response = await ReactAppUpdaterAgent(requirement,JSON.stringify(template),apiKey)
    response = JSON.parse(processInput(response))
    return response
  }