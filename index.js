const OpenAI = require('openai');
const express = require('express')
require('dotenv').config();
const app = express()
app.use(express.json())

// Remplacez 'YOUR_API_KEY' par votre clé API OpenAI

const apiKey = process.env.apiKey;
const openai = new OpenAI({ apiKey });

app.get("/getResponse", async(req,res) => {
  const userPrompt = req.body.userPrompt
  try {
    
    console.log("Question:",userPrompt)
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: userPrompt }],
      model: "gpt-3.5-turbo",
      max_tokens: 100,
    });
  
  
    console.log("Reponse:",completion.choices[0].message.content);
    res.status(200).send(completion.choices[0].message.content);
  } catch (error) {
    console.log("l'erreur",error)
  }

})

app.listen(3000,() => {
  console.log("server started")
})



