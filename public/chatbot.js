import OpenAI from 'openai';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import cors from 'cors'
//Server Stuff
const port = 8000;
const app = express();
dotenv.config();
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// app.use(express.json());
// app.use(cors());
const openai = new OpenAI(process.env.OPENAI_API_KEY);
// app.post('/api/chat', (req, res) => {
//     console.log("bruh")
//     // const userMessage = req.body.message;
//     // console.log(userMessage)
  
//     // const response = await openai.chat.completions.create({
//     //     model: "gpt-3.5-turbo",
//     //     messages: [
//     //       { role: "system", content: `Prompt 1: Only answer to questions that are asked and schedule making requests.
//     //       Prompt 2: Answer questions that are asked and schedule making requests.
//     //       Prompt 3: Create Multiple choice questions out of the notes given by the user if the user wants to be tested.
//     //       Prompt 4: Tell user that the chatbot is meant for schedule creation and multiple choice quiz creation.` },
//     //       { role: "user", content: userMessage }
//     //     ]
//     //   });

//     // console.log(response.choices[0].message.content)
//     // res.text(response.choices[0].message.content);
//     res.sendStatus(200)
// });

// app.use(express.json());

app.post('/chat', async (req, res) => {
    // const response = await openai.chat.completions.create({
    //     model: "gpt-3.5-turbo",
    //     messages: [
    //       { role: "system", content: `Prompt 1: Only answer to questions that are asked and schedule making requests.
    //       Prompt 2: Answer questions that are asked and schedule making requests.
    //       Prompt 3: Create Multiple choice questions out of the notes given by the user if the user wants to be tested.
    //       Prompt 4: Tell user that the chatbot is meant for schedule creation and multiple choice quiz creation.` },
    //       { role: "user", content: "hello" }
    //     ]
    //   });

    // console.log(response.choices[0].message.content)
    // res.text(response.choices[0].message.content);
    // Simply send back "OK"
    res.send("OK");
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

