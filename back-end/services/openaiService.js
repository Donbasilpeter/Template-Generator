import { ChatOpenAI } from '@langchain/openai';
import { BufferMemory } from 'langchain/memory';
import { ConversationChain } from 'langchain/chains';
import { MongoDBChatMessageHistory } from '@langchain/mongodb';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { react_developer_system_prompt } from '../prompts/index.js';
import db from '../database/db.js'
import UserSession from '../models/UserSession.js';

export const getChatResponseFromService = async (sessionId, description,userId) => {
  try {

    if(!sessionId){
      sessionId = String((await UserSession.create({userId}))._id)

    } 
    const memory = new BufferMemory({
      chatHistory: new MongoDBChatMessageHistory({
        collection: db.collection("ChatMemory"),
        sessionId
      }),
    });

    const model = new ChatOpenAI({
      model: 'gpt-4o',
      temperature: 0,
    });

    // Create a prompt template with a system message
    const promptTemplate = ChatPromptTemplate.fromMessages([
      ['system', react_developer_system_prompt],
      ['human', '{description}'],
      ['placeholder', '{chat_history}'],
    ]);

    // Set up the conversation chain with the system message integrated
    const chain = new ConversationChain({
      llm: model,
      memory,
      prompt: promptTemplate,
    });

    // Generate response
    const response = await chain.invoke({ description });

    return {res : response?.response, sessionId: sessionId};
  } catch (error) {
    console.error('Error in chat service:', error);
    throw new Error('Error processing chat response.');
  }
};
