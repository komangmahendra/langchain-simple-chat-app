import { PineconeStore } from "@langchain/pinecone";
import { ChatOpenAI } from "@langchain/openai";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { pull } from "langchain/hub";
import { DynamicTool } from "langchain/tools";
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";

// config
import { embeddingModels } from "../config/openAI";

// utils
import { getQuotaByDate } from "../../utils/getQuotaByDate";

class Chat {
  async postChat(queryText: string) {
    const pinecone = new PineconeClient();
    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);
    const findDoc = await PineconeStore.fromExistingIndex(embeddingModels, {
      pineconeIndex,
    });

    const llm = new ChatOpenAI({
      verbose: true,
      temperature: 0,
      model: "gpt-4o-mini",
    });
    const prompt = ChatPromptTemplate.fromTemplate(
      `Jawab pertanyaan user: {input} berdasarkan konteks berikut {context}. Jika kamu tidak tahu jawabannya berdasarkan konteks, jawab tidak tahu. Jangan mengarang jawabannya.`
    );

    const promptAgent = await pull<ChatPromptTemplate>(
      "hwchase17/openai-functions-agent"
    );

    const documentChains = await createStuffDocumentsChain({
      llm,
      prompt,
    });

    const retrievalChain = await createRetrievalChain({
      combineDocsChain: documentChains,
      retriever: findDoc.asRetriever(),
    });

    const tools = [
      new DynamicTool({
        name: "get-movie-context",
        description:
          "Call this to get the movie context from vector database based on user question.",
        func: async (input: string) =>
          (await retrievalChain.invoke({ input })).answer,
      }),
      new DynamicTool({
        name: "get-quota",
        description:
          "call this to get the available quota for specific date, with param date with format 'YYYY-MM-DD', and will return 0 if quota is unavailable. ",
        func: async (date: string) => getQuotaByDate(date),
      }),
    ];

    const agent = await createOpenAIFunctionsAgent({
      llm,
      tools,
      prompt: promptAgent,
    });

    const agentExecutor = new AgentExecutor({
      agent,
      tools,
      verbose: true,
    });

    const result = await agentExecutor.invoke({ input: queryText });
    return result;
  }
}

export const chat = new Chat();
