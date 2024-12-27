# RevealMDGen
> A simple markdown generator for revealjs presentations using GPT OpenAI API
> Still in development!

## Installation
- clone this repo and run `npm install`
- rename .env.example to .env and fill the OPENAI_API_KEY with your OpenAI API key

## How to use
see [playground.ts](playground.ts) for how to use the generator

### Example usage for generating fresh slides
```typescript
import RevealMDGen from './src/RevealMDGen';
import fs from 'fs';

// create RevealMDGen instance
const revealMDGen = new RevealMDGen();

// generate slides
revealMDGen.generateSlides("buat slide tentang kemerdekaan indonesia 45").then(() => {
  // write/save generated to markdown file
  const fs = require('fs');
  fs.writeFileSync('slides.md', revealMDGen.getActionManager().getSlidesGenerator().getSlides().getRawContent());
});

```

### Example usage for edit existing slides
```typescript
import RevealMDGen from './src/RevealMDGen';
import fs from 'fs';

const revealMDGen = new RevealMDGen();

// load existing slides from markdown file
revealMDGen.getActionManager().getSlidesGenerator().getSlides().extractSlides(fs.readFileSync('slides.md', 'utf8'));

// edit slides with prompt
revealMDGen.generateSlides("Ubah halaman 4 jadi bentuk paragraf").then(() => {
	console.log("Slides generated");

	// write to markdown file
	fs.writeFileSync('slides.md', revealMDGen.getActionManager().getSlidesGenerator().getSlides().getRawContent());
});

```
