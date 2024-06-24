import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { react_developer_system_prompt } from "./prompts/index.js"; // Adjust the path as necessary

// Create a prompt template using predefined messages and placeholders
const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", react_developer_system_prompt],
    ["human", "{description}"],
]);

// Create a parser to parse the output from the model
const parser = new StringOutputParser();

// Initialize the OpenAI model
const model = new ChatOpenAI({ model: "gpt-4o" });

// Create a chain by piping the prompt template through the model and then through the parser
const chain = promptTemplate.pipe(model).pipe(parser);

// simple react componet generation agent


export  const  ReactComponentAgent  = async (description) =>{
    try {
        const response = await chain.invoke({ description });
        return response;
    } catch (error) {
        console.error('Error processing request:', error);
        throw new Error('Internal Server Error');
    }
}


