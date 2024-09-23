import { ChatOpenAI } from "@langchain/openai";
import { JsonOutputParser,StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
     react_developer_system_prompt,
     project_manager_system_prompt,
     react_app_developer_system_prompt,
     react_app_updater_system_prompt 
} from "./prompts/index.js"; // Adjust the path as necessary





// Create a parser to parse the output from the model
const jsonparser = new JsonOutputParser();
const stringparser = new StringOutputParser();



// simple react componet generation agent


export  const  ReactComponentAgent  = async (description,openAIApiKey) =>{
    try {
        // Create a prompt template using predefined messages and placeholders
        const promptTemplate = ChatPromptTemplate.fromMessages([
        ["system", react_developer_system_prompt],
        ["human", "{description}"],
        ]);
        const model = new ChatOpenAI({ model: "gpt-4o",openAIApiKey:openAIApiKey});

        const chain = promptTemplate.pipe(model).pipe(stringparser);
        const response = await chain.invoke({ description });
        return response;
    } catch (error) {
        console.error('Error processing request:', error);
        throw new Error('Internal Server Error');
    }
}


export  const  ReactProjectAgent  = async (description,openAIApiKey) =>{
    try {
        const promptTemplate = ChatPromptTemplate.fromMessages([
        ["system", project_manager_system_prompt],
        ["human", "{description}"],
        ]);
        const model = new ChatOpenAI({ 
            model: "gpt-4o",
            temperature: 0.5,
            openAIApiKey:openAIApiKey,
            modelKwargs: {
                response_format: { type: "json_object" },
            },
        });
        const chain = promptTemplate.pipe(model).pipe(jsonparser);
        const response = await chain.invoke({ description });
        return response;
    } catch (error) {
        console.error('Error processing request:', error);
        throw new Error('Internal Server Error');
    }
}

export  const  ReactAppAgent  = async (description,structure,openAIApiKey) =>{
    try {
        const promptTemplate = ChatPromptTemplate.fromMessages([
        ["system", react_app_developer_system_prompt],
        ["human", "description :{description}\nstructure : {structure}"],
        ]);
        const model = new ChatOpenAI({ 
            model: "gpt-4o",
            temperature: 0.5,
            openAIApiKey:openAIApiKey,
        });

        const chain = promptTemplate.pipe(model).pipe(stringparser);
        const response = await chain.invoke({ description,structure });
        return response;
    } catch (error) {
        console.error('Error processing request:', error);
        throw new Error('Internal Server Error');
    }
}

export  const  ReactAppUpdaterAgent  = async (description,code,openAIApiKey) =>{
    try {
        const promptTemplate = ChatPromptTemplate.fromMessages([
        ["system", react_app_updater_system_prompt],
        ["human", "code : {code} \n{description}"],
        ]);
        const model = new ChatOpenAI({ 
            model: "gpt-4o",
            openAIApiKey:openAIApiKey,
            temperature: 0.5,
        });

        const chain = promptTemplate.pipe(model).pipe(stringparser);
        const response = await chain.invoke({ code,description });
        return response;
    } catch (error) {
        console.error('Error processing request:', error);
        throw new Error('Internal Server Error');
    }
}

