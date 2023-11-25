import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

async function getChatCompletion() {
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: "user", content: "Say this is a test" }],
            model: "gpt-3.5-turbo",
        });
        console.log(chatCompletion.choices[0].message.content);
    } catch (error) {
        console.error(error);
    }
}

getChatCompletion();

