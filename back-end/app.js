import express from 'express';
import bodyParser from 'body-parser';
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { react_developer_system_prompt } from "./prompts/index.js"; // Adjust the path as necessary
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config(); // Load environment variables from .env filenpm install dotenv


const app = express();
const port = 8000;

app.use(cors({
    origin: 'http://localhost:3000' // Replace with the allowed origin
  }));
// Middleware to parse JSON requests
app.use(bodyParser.json());

const messageHistories = {}

// Create a prompt template using predefined messages and placeholders
const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", react_developer_system_prompt],
    ["placeholder", "{chat_history}"],
    ["human", "{description}"],
]);

// Create a parser to parse the output from the model
const parser = new StringOutputParser();

// Initialize the OpenAI model
const model = new ChatOpenAI({ model: "gpt-4o" });

// Create a chain by piping the prompt template through the model and then through the parser
const chain = promptTemplate.pipe(model).pipe(parser);

// Create a runnable with message history, specifying how to retrieve and use the message history
const withMessageHistory = new RunnableWithMessageHistory({
    runnable: chain,
    getMessageHistory: async (sessionId) => {
        if (messageHistories[sessionId] === undefined) {
          messageHistories[sessionId] = new InMemoryChatMessageHistory();
        }
        return messageHistories[sessionId];
      },
    inputMessagesKey: "description",
    historyMessagesKey: "chat_history",
});

// Endpoint to handle requests
app.post('/', async (req, res) => {
    const { description, sessionId } = req.body;
    
    try {
        const response = await withMessageHistory.invoke({ description }, { configurable: { sessionId } });
        res.json({ result: response });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});