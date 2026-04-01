import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const apiKey = "AIzaSyBktVxKgv8xD8IJHwhVsXpbO2RM2pfQwNY"; // from .env
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

async function run() {
    try {
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: `SYSTEM_PROMPT: context` }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood." }],
                },
                {
                    role: "model",
                    parts: [{ text: "Welcome!" }],
                }
            ],
        });
        const result = await chat.sendMessage("Hi");
        console.log("Success:", result.response.text());
    } catch (e) {
        console.error("Error:", e.message);
    }
}
run();
