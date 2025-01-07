import {splitMarkdownBySeparator} from './utils';
import Action from './Action';

class Slides extends Action {
  private content: string[];

  constructor(content: string[] = []) {
	super();
	this.content = content;
  }

  isValidIndex(index: number): boolean {
	return index >= 0 && index < this.content.length;
  }

  getSlides(index: number): string {
	if (!this.isValidIndex(index)) {
	  throw new Error(`Index out of bounds: ${index}`);
    }
      return this.content[index];
  }

  setSlides(index: number, content: string) {
	if (!this.isValidIndex(index)) {
	  throw new Error(`Index out of bounds: ${index}`);
    }
	  this.content[index] = content;
  }
	
  removeSlides(index: number): void {
    if (!this.isValidIndex(index)) {
      throw new Error(`Index out of bounds: ${index}`);
    }
    this.content.splice(index, 1);
  }

  addSlides(content: string): void {
    this.content.push(content);
  }

  extractSlides(rawContent: string): void {
	this.content = splitMarkdownBySeparator(rawContent);
  }

  getRawContent(): string {
	return this.content.join('\n\n---\n\n');
  }

  getTools(): Array<any> {
	const toolsList = [ { "type": "function", "function": { "name": "getSlides", "description": "Get slides content by index", "strict": true, "parameters": { "type": "object", "required": ["index"], "properties": { "index": { "type": "number", "description": "Index of the slide" }
			}, "additionalProperties": false } } }, { "type": "function", "function": { "name": "setSlides",
		  "description": "Set slides content by index",
		  "strict": true,
		  "parameters": {
			"type": "object",
			"required": ["index", "content"],
			"properties": {
			  "index": { "type": "number", "description": "Index of the slide" },
			  "content": { "type": "string", "description": "Content of the slide" }
			},
			"additionalProperties": false
		  }
		}
	  },
	  {
		"type": "function",
		"function": {
		  "name": "removeSlides",
		  "description": "Remove slides content by index",
		  "strict": true,
		  "parameters": {
			"type": "object",
			"required": ["index"],
			"properties": {
			  "index": { "type": "number", "description": "Index of the slide" }
			},
			"additionalProperties": false
		  }
		}
	  },
	  {
		"type": "function",
		"function": {
		  "name": "addSlides",
		  "description": "Add slides content",
		  "strict": true,
		  "parameters": {
			"type": "object",
			"required": ["content"],
			"properties": {
			  "content": { "type": "string", "description": "Content of the slide" }
			},
			"additionalProperties": false
		  }
		}
	  },
	  {
		"type": "function",
		"function": {
		  "name": "extractSlides",
		  "description": "Extract slides from raw content",
		  "strict": true,
		  "parameters": {
			"type": "object",
			"required": ["rawContent"],
			"properties": {
			  "rawContent": { "type": "string", "description": "Raw content of the slides" }
			},
			"additionalProperties": false
		  }
		}
	  },
	  {
		"type": "function",
		"function": {
		  "name": "getRawContent",
		  "description": "Get raw content of the slides",
		  "strict": true,
		  "parameters": {}
		}
	  }
	];

	return toolsList;
	} } export default Slides;
