import Slides from './src/Slides';
// import SlidesGenerator from './src/SlidesGenerator';
import RevealJSGen from './src/RevealJSGen';
import fs from 'fs';
// import ActionManager from './src/ActionManager';
// import OpenAI from 'openai';

// Example usage for fresh create new slides
const revealJSGen = new RevealJSGen();
revealJSGen.generateSlides("buat slide tentang kemerdekaan indonesia 45").then(() => {
  console.log("Slides generated");
  // write to markdown file
  const fs = require('fs');
  fs.writeFileSync('slides.md', revealJSGen.getActionManager().getSlidesGenerator().getSlides().getRawContent());
});


// Example usage for edit existing slides
// const revealJSGen = new RevealJSGen();
// revealJSGen.getActionManager().getSlidesGenerator().getSlides().extractSlides(fs.readFileSync('slides.md', 'utf8'));
// 
// revealJSGen.generateSlides("Ubah halaman 4 jadi bentuk paragraf").then(() => {
// 	console.log("Slides generated");
// 	// write to markdown file
// 	fs.writeFileSync('slides.md', revealJSGen.getActionManager().getSlidesGenerator().getSlides().getRawContent());
// });


