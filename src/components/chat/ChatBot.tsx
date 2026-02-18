import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Loader2, User } from "lucide-react";
import { getGeminiResponse } from "@/lib/gemini";

interface Message {
    id: string;
    role: "user" | "model";
    text: string;
}

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "model",
            text: "Hello! I'm Nexus, the MindForge AI assistant. How can I help you accelerate your digital evolution today?",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            text: input,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {

            const history = messages.slice(-10).map((m) => ({
                role: m.role,
                parts: m.text,
            }));

            const responseText = await getGeminiResponse(userMessage.text, history);

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "model",
                text: responseText,
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Chat error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 w-[90vw] md:w-[400px] h-[500px] md:h-[600px] bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
                    >

                        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-mindforge-neon/20 flex items-center justify-center border border-mindforge-neon/30">
                                    <Bot className="w-6 h-6 text-mindforge-neon" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">Nexus AI</h3>
                                    <p className="text-xs text-mindforge-green flex items-center gap-1">
                                        <span className="w-2 h-2 bg-mindforge-green rounded-full animate-pulse" />
                                        Online
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>


                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((m) => (
                                <div
                                    key={m.id}
                                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === "user"
                                            ? "bg-mindforge-neon/20 text-white rounded-br-none border border-mindforge-neon/20"
                                            : "bg-white/5 text-gray-200 rounded-bl-none border border-white/5"
                                            }`}
                                    >

                                        <p className="whitespace-pre-wrap">{m.text}</p>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 p-3 rounded-2xl rounded-bl-none border border-white/5 flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 text-mindforge-neon animate-spin" />
                                        <span className="text-xs text-gray-400">Processing...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>


                        <div className="p-4 border-t border-white/10 bg-white/5">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Ask about our services..."
                                    className="flex-1 bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-mindforge-neon/50 text-sm"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={isLoading || !input.trim()}
                                    className="p-3 bg-mindforge-neon/20 hover:bg-mindforge-neon/30 text-mindforge-neon rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-mindforge-neon/20"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="text-center mt-2">
                                <p className="text-[10px] text-gray-500">Powered by MindForge Neural Engine</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-6 right-6 w-14 h-14 bg-mindforge-neon text-black rounded-full shadow-[0_0_20px_rgba(0,243,255,0.4)] flex items-center justify-center z-50 hover:bg-white transition-colors"
            >
                {isOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <MessageSquare className="w-6 h-6" />
                )}
            </motion.button>
        </>
    );
};

export default ChatBot;
