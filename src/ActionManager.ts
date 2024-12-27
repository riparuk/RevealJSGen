import SlidesGenerator from './SlidesGenerator';
import GPTClient from './GPTClient';
import ToolInterface from './interfaces/ToolInterface';

class ActionManager {
  private actions: Array<ToolInterface>;
  private gptClient: GPTClient;
  private slides_generator: SlidesGenerator;

  constructor(slides_generator: SlidesGenerator = new SlidesGenerator()) {
	this.actions = [];
	this.gptClient = new GPTClient();
	this.slides_generator = slides_generator;
  }

  async generateAction(prompt: string) {
	const messages: Array<any> = [];
	messages.push({"role": "system", "content": `You are an Intelligent bot for making presentations, user may ask to to create full presentation or edit existing presentation. if user ask for the first time or want to edit the wohole presentation, provide generateSlidesAll(). If user ask for edit presentation, provide generateSlides(), index refer page/slide number. If user ask in advance, provide one or more function to call. keep what is requested in the request`});
	messages.push({"role": "user", "content": `Request : ${prompt}`});

	try {
	  console.log("Generating action...");
	  const response = await this.gptClient.sendMessage(messages, this.slides_generator.getTools());
	  const result = this.gptClient.handleResponse(response);

	  // if string means the response is a message, if array means the response is a tool call
	  if (typeof result === "string") {
		console.log("Message response: ", result);
	  } else {
		console.log("The result is a ToolInterface[]");
		this.actions = result; // Update actions setelah promise selesai
	  }
	} catch (error) {
	  console.error("Error in generateAction:", error);
	}
  }

  async performAction() {	
	if (this.actions.length === 0) {
	  console.log("No action to perform");
	  return;
	} else {
	  console.log("Performing action");
	  for (let action of this.actions) {
		if (action.name === "generateSlidesAll") {
		  console.log("Calling generateSlidesAll");
		  await this.slides_generator.generateSlidesAll(action.arguments.prompt);
		}
		if (action.name === "generateSlides") {
		  console.log("Calling generateSlides", action);
		  await this.slides_generator.generateSlides(action.arguments.index, action.arguments.prompt);
		}
	  }
	}
  }

  getSlidesGenerator(): SlidesGenerator {
	return this.slides_generator;
  }

}

export default ActionManager;
