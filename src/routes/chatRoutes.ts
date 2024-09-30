import { Hono } from "hono";
import { chat } from "../controllers";

const asks = new Hono();

// Create source from file
asks.post("/", (c) => chat.postChat(c));

export default asks;
