import React, { useState, useEffect, useRef } from "react";

const Home = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  // 🔹 Load chat history on page load
  useEffect(() => {
    fetch("http://localhost:8000/chat-history")
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // 🔹 Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAskAI = async () => {
    if (!message.trim()) return;

    const userMessage = { role: "user", message: message };

    // Show user message instantly
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      const aiMessage = { role: "assistant", message: data.response };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      
      <div className="w-full max-w-3xl flex flex-col flex-grow p-4">

        {/* Chat Messages */}
        <div className="flex-grow overflow-y-auto space-y-4 mb-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl shadow ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-gray-500 text-sm">AI is typing...</div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Box */}
        <div className="flex items-center gap-2 border border-gray-300 rounded-2xl px-4 py-3 shadow-sm bg-white">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAskAI()}
            className="flex-1 outline-none text-gray-700"
          />
          <button
            onClick={handleAskAI}
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
