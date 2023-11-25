
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

//Timer Stuff
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        if (request.query == "start") {
            let durationInMinutes
            if (request.time == "25") {
                durationInMinutes = 25;
            } else if (request.time == "10") {
                durationInMinutes = 10;
            }
            let endTime = new Date(new Date().getTime() + durationInMinutes * 60000);
            console.log(endTime);
            chrome.storage.local.set({"timer": endTime.toISOString()})
            setInterval(() => {
                chrome.storage.local.get(["timer"], (result) => {
                    let endTime = new Date(result.timer);
                    let now = new Date().getTime();
                    let differenceInMilliSeconds = endTime - now;
                    let differenceInSeconds = differenceInMilliSeconds / (1000);
                    let minutes = Math.floor(differenceInSeconds / 60);
                    let seconds = Math.ceil(differenceInSeconds % 60);
                    console.log(minutes, seconds)
                    chrome.runtime.sendMessage({query: "time", minutes, seconds})
                })
            }, 1000)
        } else if (request.query == "pause") {

        } else if (request.query == "reset") {

        }
    }
)
