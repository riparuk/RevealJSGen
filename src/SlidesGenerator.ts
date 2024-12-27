import Slides from './Slides';
import GPTClient from './GPTClient';
import {extractMarkdownCodeBlock} from './utils';

class SlidesGenerator {
  private slides: Slides;
  private gptClient: GPTClient;
  
  constructor(slides: Slides = new Slides()) {
	this.slides = slides;
	this.gptClient = new GPTClient();
  }

  getSlides(): Slides {
	return this.slides;
  }

  async generateSlidesAll(prompt: string) {
	console.log("Generating Slides All, prompt : ", prompt);
	const messages: Array<any> = [];
	messages.push({"role": "system", "content": "You are an Intelligent bot for making presentations and understands the Reveal.js framework. The criteria for good content is simple, using a combination of list points or in the form of long paragraph sentences (maximum 2 sentences) without lists on each page or a combination of both (sentences and then list points) on one page. Think about a good outline, content and prioritize the long paragraph style without items if possible, 40% sentence form, 30% list points, and 20% combination style. Place styles randomly but keep it directional, customize it so it doesn't look monotonous. Fill each section, no placeholders. Always provide the results in one markdown format that Reveal.js supported, each slide devided by '---', fill each section, don't have any placeholders. Always start with ```markdown and end with ```"});

	// check if not first time
	if (this.slides.isValidIndex(0)) {
	  console.log("Not first time, feeding current slides...");
	  messages.push({"role": "assistant", "content": "Current slides : \n```markdown\n" + this.slides.getRawContent() + "\n```"});
	}
	
	messages.push({"role": "user", "content": prompt});

	try {
	  console.log("Generating action...");
	  const response = await this.gptClient.sendMessage(messages);
	  const result = this.gptClient.handleResponse(response);

	  if (typeof result === "string") {
		// extract markdown extractMarkdownCodeBlock
		const markdown = extractMarkdownCodeBlock(result);
		console.log("Message response: \n", result);
		console.log("Extracted markdown code: \n", markdown);

		// edit entire slide content
		console.log("Editing entire slide content...");
		if (markdown === null) {
		  console.log("No markdown code block found");
		} else {
		  this.slides.extractSlides(markdown);
		  console.log("Slides updated");
		}
	  } else {
		console.log("The result should not be a ToolInterface[]");
	  }
	} catch (error) {
	  console.error("Error in generateSlidesAll:", error);
	}

  }

  async generateSlides(index: number, prompt: string) {
	const messages: Array<any> = [];

	// check if index is valid
	if (this.slides.isValidIndex(index)) {

	  console.log("Generating Slides, index : ", index, " prompt : ", prompt);
	  messages.push({"role": "system", "content": "You are an Intelligent bot for making presentations and understands the Reveal.js framework. You will edit only the provided slide content as specified. Always provide the results in markdown format that Reveal.js supported. Limit the result up to 50 words. Always start with ```markdown and end with ```"});
	  messages.push({"role": "assistant", "content": `Slide ${index} : \n${this.slides.getSlides(index)}`});
	  messages.push({"role": "user", "content": prompt});

	  try {
		console.log(`Generating content Slides ${index}...`);
		const response = await this.gptClient.sendMessage(messages);
		const result = this.gptClient.handleResponse(response);

		if (typeof result === "string") {
		  // extract markdown code
		  const markdown = extractMarkdownCodeBlock(result);
		  console.log("Message response: ", result);
		  console.log("Extracted markdown code: ", markdown);

		  // update slide content
		  console.log("Changing slide content...");
		  if (markdown === null) {
			console.log("No markdown code block found");
		  } else {
			this.slides.setSlides(index, markdown);
		  }

		} else {
		  console.log("The result should not be a ToolInterface[]");
		}

	  } catch (error) {
		console.error("Error in generateSlides:", error);
	  }

	} else {
	  console.log(`Index ${index} is not valid`);
	}
  }

  getTools(): Array<any> {
	const toolsList = [
	  {
		"type": "function",
		"function": {
		  "name": "generateSlidesAll",
		  "description": "Generate All slides, good for first time",
		  "strict": true,
		  "parameters": {
			"type": "object",
			"required": ["prompt"],
			"properties": {
			  "prompt": { 
				"type": "string", 
				"description": "Prompt for generating slides" }
			},
			"additionalProperties": false
		  }
		}
	  },
	  {
		"type": "function",
		"function": {
		  "name": "generateSlides",
		  "description": "Generate slides for specific index",
		  "strict": true,
		  "parameters": {
			"type": "object",
			"required": ["index", "prompt"],
			"properties": {
			  "index": { "type": "number", "description": "Index of the slide" },
			  "prompt": { "type": "string", "description": "Prompt for generating slides" }
			},
			"additionalProperties": false
		  }
		}
	  },
	];

	return toolsList;

  }
}

export default SlidesGenerator;
