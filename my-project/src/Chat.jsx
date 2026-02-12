import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const Chat = () => {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I am your AI assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/ask",
                {
                    message: input,
                    system_prompt: "You are a helpful assistant."
                }
            );

            const aiMessage = {
                role: 'assistant',
                content: response.data.response
            };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error:", error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "Sorry, I encountered an error connecting to the server."
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-[calc(100vh-64px)] bg-[#0f172a] text-white pt-16">
            {/* Sidebar (Hidden on mobile for now, or just a placeholder for history) */}
            <div className="hidden md:flex w-[260px] flex-col bg-[#0b1120] border-r border-white/10 p-4">
                <button
                    onClick={() => setMessages([{ role: 'assistant', content: 'Hello! I am your AI assistant. How can I help you today?' }])}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg border border-white/20 hover:bg-white/5 transition-colors text-sm text-left mb-4"
                >
                    <span className="text-xl">+</span> New Chat
                </button>
                <div className="flex-1 overflow-y-auto">
                    <div className="text-xs font-medium text-gray-500 mb-2 px-2">Today</div>
                    <div className="group flex items-center gap-3 px-3 py-3 text-sm text-gray-300 hover:bg-white/5 rounded-lg cursor-pointer transition-colors truncate">
                        <span className="truncate">New conversation</span>
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col relative">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {/* Avatar for Assistant */}
                            {msg.role === 'assistant' && (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                                    <span className="text-xs font-bold text-white">AI</span>
                                </div>
                            )}

                            <div
                                className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-5 py-3 ${msg.role === 'user'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white/10 text-gray-100 border border-white/5'
                                    }`}
                            >
                                <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                            </div>

                            {/* Avatar for User (Optional) */}
                            {msg.role === 'user' && (
                                <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center flex-shrink-0">
                                    <span className="text-xs font-bold text-white">U</span>
                                </div>
                            )}
                        </div>
                    ))}
                    {loading && (
                        <div className="flex gap-4 justify-start">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center flex-shrink-0 animate-pulse">
                                <span className="text-xs font-bold text-white">AI</span>
                            </div>
                            <div className="bg-white/10 rounded-2xl px-5 py-3 flex items-center gap-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 md:p-6 bg-[#0f172a] border-t border-white/10">
                    <form onSubmit={handleSend} className="max-w-3xl mx-auto relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Send a message..."
                            className="w-full bg-[#1e293b] text-white rounded-xl pl-4 pr-12 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-lg border border-white/5 placeholder-gray-500"
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || loading}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:bg-transparent disabled:text-gray-500 transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                            </svg>
                        </button>
                    </form>
                    <p className="text-center text-xs text-gray-500 mt-2">
                        AI can make mistakes. Consider checking important information.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Chat;
