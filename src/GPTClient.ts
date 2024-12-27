import OpenAI from "openai";
import ToolInterface from "./interfaces/ToolInterface";
import dotenv from "dotenv";

dotenv.config();

class GPTClient {
  openai: OpenAI;
  default_model: string;

  constructor() {
	const apiKey = process.env.OPENAI_API_KEY;
	if (!apiKey) {
	  throw new Error("OPENAI_API_KEY is not defined, please define it in your .env file");
	}
	this.openai = new OpenAI({apiKey});
	this.default_model = "gpt-4o-mini";
  }

  async sendMessage(messages: Array<any>, tools?: Array<any> ): Promise<OpenAI.Chat.Completions.ChatCompletion> {	
	return await this.openai.chat.completions.create({
	  model: this.default_model,
	  messages: messages,
	  tools: tools,
	});
  }

  // will return either a string or an array of ToolInterface
  handleResponse(response: OpenAI.Chat.Completions.ChatCompletion): string | ToolInterface[]{

	if (response.choices[0].message.tool_calls) {
	  const tool_calls = Array<ToolInterface>();
	  for (let tool_call of response.choices[0].message.tool_calls) {
		// Convert string to object
		const args_obj = JSON.parse(tool_call.function.arguments);
		tool_calls.push({
		  name: tool_call.function.name,
		  arguments: args_obj,
		});
	  }
	  return tool_calls;
	} else if (response.choices[0].message.content) {
	  return response.choices[0].message.content;
	} else {	
	  return "Failed to handle response";
	}
	
  }

}


export default GPTClient;
