import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

class SplitterText {
  async create(input: string[], metadatas: Record<string, any>[]) {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 600,
      chunkOverlap: 50,
    });
    const texts = await splitter.createDocuments(input, metadatas);
    return texts;
  }
}

export const splitter = new SplitterText();
