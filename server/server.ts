import OpenAI from "openai";
import "dotenv/config";
import express, { response } from "express";

const app = express();

const reactStaticDir = new URL("../client/dist", import.meta.url).pathname;
const uploadsStaticDir = new URL("public", import.meta.url).pathname;

app.use(express.static(reactStaticDir));

app.use(express.static(uploadsStaticDir));
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
