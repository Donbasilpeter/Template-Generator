import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";

export const messageHistories = {};

export const getMessageHistory = async (sessionId) => {
  if (messageHistories[sessionId] === undefined) {
    messageHistories[sessionId] = new InMemoryChatMessageHistory();
  }
  return messageHistories[sessionId];
};
