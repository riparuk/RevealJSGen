interface DocSection {
  title: string;
  content: string;
  keywords: string[];
}

// Contoh data
const docSections: DocSection[] = [
  {
    title: "Introduction",
    content: "This is the introduction section.",
    keywords: ["intro", "start", "overview"]
  },
  {
    title: "Methods",
    content: "This section explains the methodology.",
    keywords: ["method", "experiment", "procedure"]
  },
  {
    title: "Conclusion",
    content: "This is the conclusion section.",
    keywords: ["end", "summary", "conclusion"]
  }
];

var results = Array<DocSection>();

// Objek dengan method searchByKeywords
const docManager = {
  sections: docSections,
  searchByKeywords(keywords: string[]): void {
    results = this.sections.filter((section) => {
      return section.keywords.some((keyword) => keywords.includes(keyword));
    });
  }
};

// Cari section dengan kata kunci "start"
docManager.searchByKeywords(["summary"]);
console.log(results);
