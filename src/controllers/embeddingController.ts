import { Context } from "hono";
import { embedding } from "../models/embeddingModels";

/**
 * @api {get} /customers Get All Customers
 * @apiGroup Customers
 * @access Private
 */
export const postRetrieveFromFile = async (c: Context) => {
  const { filename, metadatas } = await c.req.json();
  const embeddings = await embedding.getFromFile(filename, metadatas);
  return c.json({ embeddings });
};
