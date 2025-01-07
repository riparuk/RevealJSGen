import Slides from './Slides';
import Documentation from './Documentation';
import GPTClient from './GPTClient';
import {extractMarkdownCodeBlock} from './utils';
import ActionManager from './ActionManager';
import Action from './Action';

class SlidesGenerator extends Action {
  private gptClient: GPTClient;
  private slides: Slides;
  private slidesManager: ActionManager;
  private documentationManager: ActionManager;

  constructor(slides: Slides = new Slides(), documentation: Documentation = new Documentation()) {
	super();
	this.slides = slides;
	this.slidesManager = new ActionManager(this.slides);
	this.documentationManager = new ActionManager(documentation);
	this.gptClient = new GPTClient();
  }

  private promptStructure(summary: string, docs: string, criteria: string, slides: string): string {
	return `# Summary\n${summary}\n\n# Documentation\n${docs}\n\n# Criteria\n${criteria}\n\n# Slides\n${slides}`;
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
	  {
		"type": "function",
		"function": {
		  "name": "generateSlidesBetween",
		  "description": "Generate slides between start and end index",
		  "strict": true,
		  "parameters": {
			"type": "object",
			"required": ["startIndex", "endIndex", "prompt"],
			"properties": {
			  "startIndex": { "type": "number", "description": "Start index of the slide" },
			  "endIndex": { "type": "number", "description": "End index of the slide" },
			  "prompt": { "type": "string", "description": "Prompt for generating slides" }
			},
			"additionalProperties": false
		  }
		}
	  }
	];

	return toolsList;

  }
  
  // Tidak dipakai
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

  // Tidak dipakai
  async generateSlides(index: number, prompt: string) {
	const docs_messages: Array<any> = [];
	const slides_messages: Array<any> = [];

	// check if index is valid
	if (this.slides.isValidIndex(index)) {
	  console.log("Docs generating action...");
	  docs_messages.push({"role": "system", "content": ""});
	  docs_messages.push({"role": "user", "content": prompt});

	  await this.documentationManager.generateAction(docs_messages);
	  this.documentationManager.performAction();


	  // ========================================

	  console.log("Slides generating action...");
	  slides_messages.push({"role": "system", "content": ""});
	  slides_messages.push({"role": "assistant", "content": `Slide ${index} : \n${this.slides.getSlides(index)}`});
	  slides_messages.push({"role": "user", "content": prompt});

	  await this.slidesManager.generateAction(slides_messages);
	  this.slidesManager.performAction();


	} else {
	  console.log(`Index ${index} is not valid`);
	}
  }

  async generateSlidesBetween(startIndex: number, endIndex: number, prompt: string) {
  }

}

export default SlidesGenerator;
