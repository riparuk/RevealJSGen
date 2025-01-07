import ActionManager from './ActionManager';
import SlidesGenerator from './SlidesGenerator';

// Class for general generating handler
class RevealMDGen {
  private slidesGeneratorManager: ActionManager;

  constructor(slidesGenerator = new SlidesGenerator()) {
	this.slidesGeneratorManager = new ActionManager(slidesGenerator)
  }

  async generate(prompt: string) {
	// For SlidesGenerator
	const messages: Array<any> = [];

	// intruksikan bot untuk bisa membuat prompt yang baik (kriteria dan style yang dibutuhkan) dan bisa memilih tools dari SlidesGenerator sesuai yang diminta
	messages.push({"role": "system", "content": "You are an Intelligent bot for making presentations and understands the Reveal.js framework. ..."});
	messages.push({"role": "user", "content": prompt});

	await this.slidesGeneratorManager.generateAction(messages);
	this.slidesGeneratorManager.performAction();

  }

  getSlidesGeneratorManager(): ActionManager {
	return this.slidesGeneratorManager;
  }

}

export default RevealMDGen;
