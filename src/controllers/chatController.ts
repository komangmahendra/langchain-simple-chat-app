import { Context } from "hono";
import { chat } from "../models/chatModels";

export const postChat = async (c: Context) => {
  const { question } = await c.req.json();
  const answer = await chat.postChat(question);
  return c.json({ answer });
};
