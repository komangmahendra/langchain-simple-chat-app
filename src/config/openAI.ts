import { OpenAIEmbeddings } from "@langchain/openai";

export const embeddingModels = new OpenAIEmbeddings({
  apiKey: process.env.OPENAI_API_KEY,
  model: "text-embedding-3-small",
});
