import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { react_developer_system_prompt } from "../prompts/index.js";
import { getMessageHistory } from "../models/messageHistory.js";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";

const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", react_developer_system_prompt],
  ["placeholder", "{chat_history}"],
  ["human", "{description}"],
]);

const parser = new StringOutputParser();

const model = new ChatOpenAI({ model: "gpt-4o" });

const chain = promptTemplate.pipe(model).pipe(parser);

export const withMessageHistory = new RunnableWithMessageHistory({
  runnable: chain,
  getMessageHistory,
  inputMessagesKey: "description",
  historyMessagesKey: "chat_history",
});
