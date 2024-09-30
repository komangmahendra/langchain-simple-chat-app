import { Hono } from "hono";
import { embedding } from "../controllers";

const embeddings = new Hono();

// Create source from file
embeddings.post("/", (c) => embedding.postRetrieveFromFile(c));

export default embeddings;
