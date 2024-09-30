import fs from "fs";
import path from "path";
import { splitter } from "./spliiterTextModels";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { embeddingModels } from "../config/openAI";

export class Embedding {
  async getFromFile(filename: string, metadatas?: Record<string, any>[]) {
    try {
      const result = fs.readFileSync(
        path.resolve(__dirname, `../sources/${filename}.txt`),
        "utf-8"
      );

      const splittedTexts = await splitter.create([result], metadatas || []);

      const pinecone = new PineconeClient();
      const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);
      PineconeStore.fromDocuments(splittedTexts, embeddingModels, {
        pineconeIndex,
      });

      return splittedTexts;
    } catch (err) {
      console.error(err);
    }
  }
}

export const embedding = new Embedding();
