import Slides from './src/Slides';
// import SlidesGenerator from './src/SlidesGenerator';
import RevealMDGen from './src/RevealMDGen';
import fs from 'fs';
// import ActionManager from './src/ActionManager';
// import OpenAI from 'openai';

// Example usage for fresh create new slides
const revealMDGen = new RevealMDGen();
revealMDGen.generateSlides("buat slide tentang kemerdekaan indonesia 45").then(() => {
  console.log("Slides generated");
  // write to markdown file
  const fs = require('fs');
  fs.writeFileSync('slides.md', revealMDGen.getActionManager().getSlidesGenerator().getSlides().getRawContent());
});


// Example usage for edit existing slides
// const RevealMDGen = new RevealMDGen();
// RevealMDGen.getActionManager().getSlidesGenerator().getSlides().extractSlides(fs.readFileSync('slides.md', 'utf8'));
// 
// RevealMDGen.generateSlides("Ubah halaman 4 jadi bentuk paragraf").then(() => {
// 	console.log("Slides generated");
// 	// write to markdown file
// 	fs.writeFileSync('slides.md', RevealMDGen.getActionManager().getSlidesGenerator().getSlides().getRawContent());
// });


