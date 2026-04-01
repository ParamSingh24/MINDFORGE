import { GoogleGenerativeAI } from "@google/generative-ai";

// Only load keys from Vite env if in DEV mode or as a fallback
const KEY_PREFIX = "VITE_GEMINI_KEY_";
const GEMINI_KEYS = [
    import.meta.env.VITE_GEMINI_KEY_1,
    import.meta.env.VITE_GEMINI_KEY_2,
    import.meta.env.VITE_GEMINI_KEY_3,
    import.meta.env.VITE_GEMINI_KEY_4,
    import.meta.env.VITE_GEMINI_KEY_5,
    import.meta.env.VITE_GEMINI_KEY_6,
].filter(Boolean) as string[];

let currentKeyIndex = 0;

const getNextKey = () => {
    if (GEMINI_KEYS.length === 0) return null;
    const key = GEMINI_KEYS[currentKeyIndex];
    currentKeyIndex = (currentKeyIndex + 1) % GEMINI_KEYS.length;
    console.log("Debug: Using Gemini Key Index:", currentKeyIndex, "Key exists:", !!key);
    return key;
};

// MindForge Knowledge Base (Only needed for client-side DEV mode)
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

export const getGeminiResponse = async (
    message: string,
    history: { role: "user" | "model"; parts: string }[] = []
): Promise<string> => {

    // HYBRID MODE:
    // If in PRODUCTION, use Backend API.
    // If in DEV, strictly use client-side keys (Vercel functions don't run in `npm run dev` without Vercel CLI).
    const isDev = import.meta.env.DEV;

    if (!isDev) {
        try {
            // Call the serverless function
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message, history }),
            });

            if (!response.ok) {
                // If backend fails (e.g. 404 in local preview without functions), fall back to client
                console.warn("Backend API failed, trying client-side fallback...");
                throw new Error("Backend failed");
            }

            const data = await response.json();
            return data.text;
        } catch (error) {
            console.error("Backend API Error, falling back to client keys:", error);
            // Fallthrough to client logic below if backend fails
        }
    }

    // FALLBACK / DEV MODE
    if (GEMINI_KEYS.length === 0) {
        console.error("DEV MODE ERROR: No VITE_GEMINI_KEY_* found. Check .env.");
        return "System Alert: Neural Link Disconnected (Missing API Keys).";
    }

    // CLIENT-SIDE FALLBACK (Default for Dev)
    // Retry logic with key rotation
    let attempts = 0;
    const maxAttempts = GEMINI_KEYS.length;

    while (attempts < maxAttempts) {
        const apiKey = getNextKey();
        if (!apiKey) return "Error: No API keys configured.";

        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ 
                model: "gemini-2.5-flash-lite",
                systemInstruction: MINDFORGE_CONTEXT
            });

            let cleanHistory = history.map(h => ({ role: h.role, parts: [{ text: h.parts }] }));
            if (cleanHistory.length > 0 && cleanHistory[0].role === 'model') {
                cleanHistory.shift();
            }

            const chat = model.startChat({
                history: cleanHistory,
                generationConfig: {
                    maxOutputTokens: 500,
                },
            });

            const result = await chat.sendMessage(message);
            const response = result.response;
            return response.text();
        } catch (error) {
            console.error(`Gemini Error (Key index ${currentKeyIndex}):`, error);
            attempts++;
        }
    }

    return "I'm currently experiencing high traffic. Please try again in a moment or contact us directly at codewithparamsingh@gmail.com.";
};
