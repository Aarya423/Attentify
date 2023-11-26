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
console.log(process.env.OPENAI_API_KEY);
const openai = new OpenAI(process.env.OPENAI_API_KEY);
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: userMessage }],
        model: "gpt-3.5-turbo",
    });
    res.json({ message: chatCompletion.choices[0].message.content });
});
app.listen(port, () => {
    console.log('server is running on port 3000');
});

