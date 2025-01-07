import Action from "./Action";


type DocSection = {
  keywords: string[];
  description: string;
  content: string;
};

class Documentation extends Action {
  private sections: Array<DocSection>;

  // temporary variable for search results
  private results: Array<DocSection>;

  constructor() {
	super();
	this.sections = [];
	this.results = [];
  }

  addSection(keywords: string[], description: string, content: string): void {
	this.sections.push({ keywords, description, content });
	}

  getAllSections(): Array<DocSection> {
	return this.sections;
	}

  searchByKeywords(keywords: string[]): void {
	this.results = this.sections.filter((section) => {
	  return section.keywords.some((keyword) => keywords.includes(keyword));
	});
  }

  private initSections(): void {
	this.addSection(["add_image"], "Add Image", "This is how you add an image in markdown\n ```\n![alt text](image.jpg)\n```");
  }

  // provide what keywords to search in description
  getTools(): Array<any> {
	const keywords = ["add_image"];
	const toolsList = [
	  {
		"type": "function",
		"function": {
		  "name": "searchByKeywords",
		  "description": "Get sections by keywords",
		  "strict": true,
		  "parameters": {
			"type": "object",
			"required": ["keywords"],
			"properties": {
			  "keywords": { 
				"type": "array", 
				"items": { "type": "string" }, 
				"description": `Keywords to search: ${keywords}` }
			},
			"additionalProperties": false
		  }
		}
	  }
	];

	return toolsList;
  }
}

export default Documentation;
