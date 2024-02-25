const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const OpenAI = require("openai");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/chatbot", async (req, res) => {
  const { key, prompt } = req.body;

  const openai = new OpenAI({
    apiKey: key,
  });

  const completion = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: prompt,
    temperature: 1,
    max_tokens: 512,
    top_p: 0,
  });
  res.send(completion.choices[0].text);
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running on: ${PORT}`);
});
