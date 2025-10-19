require('dotenv').config();  // make sure you have installed dotenv
const express = require('express');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post('/ask', async (req, res) => {
  const { question } = req.body;
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: question }],
    });
    res.json({ answer: response.data.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error with OpenAI API");
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
