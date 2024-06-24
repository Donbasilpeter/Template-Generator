import { ReactComponentAgent } from "../LLM/agents";


export const submitDescription = async (description) => {
  try {
    const response = await ReactComponentAgent(description).then((res=>{console.log(res)}))
    console.log(response.data.result)
    return response.data.result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
