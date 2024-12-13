import { ChatOpenAI } from '@langchain/openai';
import { BufferMemory } from 'langchain/memory';
import { MongoDBChatMessageHistory } from '@langchain/mongodb';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { react_developer_system_prompt } from '../prompts/index.js';
import db from '../database/db.js'
import UserSession from '../models/UserSession.js';
import { CustomConversationChain } from '../utils/chainWithMemoryandPromt.js';

export const getChatResponseFromService = async (sessionId, description,userId) => {
  try {

    if(!sessionId){
      sessionId = String((await UserSession.create({userId,name:description.substring(0,25)}))._id)

    } 
    const memory = new BufferMemory({
      chatHistory: new MongoDBChatMessageHistory({
        collection: db.collection("ChatMemory"),
        sessionId
      }),
    });

    const model = new ChatOpenAI({
      model: 'gpt-4o',
      temperature: 0.7,
    });


    const chain = new CustomConversationChain({ llm: model, memory,systemMessage:react_developer_system_prompt });


    // Generate response
    const response = await chain.invoke({ input:description });

    return {res : response?.response, sessionId: sessionId};
  } catch (error) {
    console.error('Error in chat service:', error);
    throw new Error('Error processing chat response.');
  }
};
