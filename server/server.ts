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

app.post("/api/response", async (req, res, next) => {
  try {
    const { city } = req.body;

    const response1 = await openai.chat.completions.create({
      model: "gpt-4o-2024-05-13",
      messages: [
        {
          role: "system",
          content:
            "You are a professional travel guide for Europe with focus on exclusive vacations that focus on authentic experiences.",
        },
        {
          role: "user",
          content: `My user is waiting to receive a brief travel itinerary with a description of three days regarding ${city}.`,
        },
      ],
    });
    res.json({ result: response1.choices[0].message.content });
  } catch (err) {
    console.error(err);
    next(err);
  }
});



/*
 * Handles paths that aren't handled by any other route handler.
 * It responds with `index.html` to support page refreshes with React Router.
 * This must be the _last_ route, just before errorMiddleware.
 */

// app.get("*", (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.listen(process.env.PORT, () => {
  console.log("Listening on port", process.env.PORT);
});
