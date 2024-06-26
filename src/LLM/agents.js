import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
     react_developer_system_prompt,
     project_manager_system_prompt,
     react_app_developer_system_prompt,
     react_app_reviewer_system_prompt 
} from "./prompts/index.js"; // Adjust the path as necessary




const openAIApiKey = process.env.REACT_APP_OPENAI_API_KEY

// Initialize the OpenAI model
const model = new ChatOpenAI({ model: "gpt-4o",openAIApiKey:openAIApiKey});
// Create a parser to parse the output from the model
const parser = new StringOutputParser();


// simple react componet generation agent


export  const  ReactComponentAgent  = async (description) =>{
    try {
        // Create a prompt template using predefined messages and placeholders
        const promptTemplate = ChatPromptTemplate.fromMessages([
        ["system", react_developer_system_prompt],
        ["human", "{description}"],
        ]);
        const chain = promptTemplate.pipe(model).pipe(parser);
        const response = await chain.invoke({ description });
        return response;
    } catch (error) {
        console.error('Error processing request:', error);
        throw new Error('Internal Server Error');
    }
}


export  const  ReactProjectAgent  = async (description) =>{
    try {
        const promptTemplate = ChatPromptTemplate.fromMessages([
        ["system", project_manager_system_prompt],
        ["human", "{description}"],
        ]);
        const chain = promptTemplate.pipe(model).pipe(parser);
        const response = await chain.invoke({ description });
        return response;
    } catch (error) {
        console.error('Error processing request:', error);
        throw new Error('Internal Server Error');
    }
}

export  const  ReactAppAgent  = async (description) =>{
    try {
        const promptTemplate = ChatPromptTemplate.fromMessages([
        ["system", react_app_developer_system_prompt],
        ["human", "{description}"],
        ]);
        const chain = promptTemplate.pipe(model).pipe(parser);
        const response = await chain.invoke({ description });
        return response;
    } catch (error) {
        console.error('Error processing request:', error);
        throw new Error('Internal Server Error');
    }
}

export  const  ReactAppReviewerAgent  = async (description,code) =>{
    try {
        const promptTemplate = ChatPromptTemplate.fromMessages([
        ["system", react_app_reviewer_system_prompt],
        ["human", "requirement :   {description} \n code : {code} "],
        ]);
        const chain = promptTemplate.pipe(model).pipe(parser);
        const response = await chain.invoke({ description,code });
        return response;
    } catch (error) {
        console.error('Error processing request:', error);
        throw new Error('Internal Server Error');
    }
}

