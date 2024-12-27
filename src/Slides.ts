import {splitMarkdownBySeparator} from './utils';

class Slides {
  private content: string[];

  constructor(content: string[] = []) {
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

}

export default Slides;
