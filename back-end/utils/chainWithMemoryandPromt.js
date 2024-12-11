import { PromptTemplate } from "@langchain/core/prompts";
import { ConversationChain } from "langchain/chains";

/**
 * A class that extends the ConversationChain to require an initial sentence for the conversation template.
 */
export class CustomConversationChain extends ConversationChain {
    constructor({ systemMessage, ...rest }) {
        if (!systemMessage) {
            throw new Error("The 'systemMessage' parameter is required.");
        }

        // Create a new template with the provided initial sentence
        const customTemplate = `${systemMessage}
{history}
Human: {input}
AI:`;

        // Pass the new prompt to the parent constructor
        super({
            ...rest,
            prompt: new PromptTemplate({
                template: customTemplate,
                inputVariables: ["history", "input"],
            }),
        });
    }
}
