import OpenAI from 'openai';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
//Server Stuff
const port = 3000;
const app = express();
dotenv.config();
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/', express.static(path.join(__dirname, '..', 'mainPage')));
const openai = new OpenAI(process.env.OPENAI_API_KEY);
app.post('/api/chat/:response', async (req, res) => {
    const userMessage = req.params.response;

    const prompts = [
        "Prompt 1: Only answer to questions that are asked and schedule making requests.\n",
        "Prompt 2: Answer questions that are asked and schedule making requests.\n",
        "Prompt 3: Create Multiple choice questions out of the notes given by the user if the user wants to be tested.\n",
        "Prompt 4: Tell user that the chatbot is meant for schedule creation and multiple choice quiz creation.\n",
    ];

    const chatCompletion = await openai.chat.completions.create({
        messages: [{ 
            role: "user", 
            content: userMessage, 
            ...prompts.map((prompt) => ({ role:"system",content:prompt }))}],
        model: "gpt-3.5-turbo",
    });
    res.json({ message: chatCompletion.choices[0].message.content });
});
app.listen(port, () => {
    console.log('server is running on port 3000');
});

