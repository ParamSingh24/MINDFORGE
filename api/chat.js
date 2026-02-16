
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load keys from server-side environment variables
// Vercel exposes these as process.env.GEMINI_KEY_1, for example.
// We also support VITE_ prefixed keys for local dev fallback if node environment picks them up (rare in Vercel functions, but good for consistency)
const GEMINI_KEYS = [
    process.env.GEMINI_KEY_1 || process.env.VITE_GEMINI_KEY_1,
    process.env.GEMINI_KEY_2 || process.env.VITE_GEMINI_KEY_2,
    process.env.GEMINI_KEY_3 || process.env.VITE_GEMINI_KEY_3,
    process.env.GEMINI_KEY_4 || process.env.VITE_GEMINI_KEY_4,
    process.env.GEMINI_KEY_5 || process.env.VITE_GEMINI_KEY_5,
    process.env.GEMINI_KEY_6 || process.env.VITE_GEMINI_KEY_6,
].filter(Boolean);

// MindForge Knowledge Base (Same as frontend, but secure on server)
const MINDFORGE_CONTEXT = `
You are **Nexus**, the advanced AI assistant for **MindForge Agency**. 
Your goal is to help potential clients understand our services, book audits, and navigate our high-tech offerings.

**Identity:**
- Name: Nexus
- Personality: Professional, Agentic, Tech-Forward, Concise, Helpful. You speak like a senior engineer or product strategist.
- Tone: Confident, Intelligent, slightly futuristic but grounded in business value.

**Agency Details:**
- **Name:** MindForge Agency
- **Tagline:** "We Build Autonomous Growth Engines."
- **Core Philosophy:** "Diagnostic First". We don't just take orders; we diagnose the root cause and prescribe strategic solutions.
- **Contact Email:** codewithparamsingh@gmail.com
- **Contact Phone:** +91 89329-59222

**Service Catalog (2026):**
1. **AI & Agentic Engineering:** Autonomous agents (LangChain, n8n), Custom LLMs, Conversational Commerce.
2. **The Next Era of SEO (GSO & AEO):** Generative Search Optimization (for AI search engines), Programmatic SEO.
3. **Full Stack Product Engineering:** B2B SaaS, Modern Apps (Swift/Kotlin/Flutter), Legacy Modernization. 
4. **Web3 & Blockchain:** DApps (Aptos/Solana), Smart Contracts, AI+Blockchain Fusion.
5. **Hyper-Automation & RevOps:** Automated Sales Funnels, Lead Qualifiers.

**Key Instructions:**
- **Answer Questions:** Explain our services clearly. Use analogies if helpful.
- **Drive Conversions:** Encourage users to "Book a Free 15-Minute Technical Audit" or "Start their Evolution".
- **Contact Info:** If they ask to hire us or contact us, provide the email and phone number.
- **No Hallucinations:** Do not invent services we don't offer.
- **Formatting:** Use short paragraphs, bullet points, and **bold** for emphasis. Keep it clean.

**Current Date:** ${new Date().toLocaleDateString()}
`;

// Simple in-memory counter for rotation (reset on serverless wake, random start is better)
let currentKeyIndex = Math.floor(Math.random() * GEMINI_KEYS.length);

const getNextKey = () => {
    if (GEMINI_KEYS.length === 0) return null;
    const key = GEMINI_KEYS[currentKeyIndex];
    currentKeyIndex = (currentKeyIndex + 1) % GEMINI_KEYS.length;
    return key;
};


export default async function handler(req, res) {
    // CORS policies are handled by Vercel usually, but good to set explicit headers for safety
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { message, history } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const apiKey = getNextKey();
        if (!apiKey) {
            throw new Error("No API keys configured on server.");
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite-001" });

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: `SYSTEM_PROMPT: ${MINDFORGE_CONTEXT}` }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am Nexus, ready to assist for MindForge Agency." }],
                },
                ...(history || []).map(h => ({ role: h.role, parts: [{ text: h.parts }] }))
            ],
            generationConfig: {
                maxOutputTokens: 500,
            },
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        return res.status(200).json({ text });

    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: "Failed to process request", details: error.message });
    }
}
