import {Configuration, OpenAIApi} from 'openai';
import dotenv from 'dotenv';
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// const express = require('express');
// const app = express();
// app.use(express.json());

async function main() {
    const gptResponse = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{
            role: 'user', content: 'Hello, how are you?'
        }]
    });
    console.log(gptResponse.data.choices[0]);
}
main();