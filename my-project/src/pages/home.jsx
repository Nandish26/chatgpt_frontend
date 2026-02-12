import React, { useState } from "react";

const Home = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error(error);
      setResponse("Error connecting to AI.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
        What can I help with?
      </h1>

      <div className="w-full max-w-xl">

        {/* Input box */}
        <div className="flex items-center gap-2 border border-gray-300 rounded-2xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-gray-300">
          <input
            type="text"
            placeholder="Ask anything"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAskAI()}
            className="flex-1 outline-none text-gray-700 placeholder-gray-400"
          />
          <button
            onClick={handleAskAI}
            className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-full hover:bg-blue-700 transition"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {["Attach", "Search", "Study", "Create image"].map((item) => (
            <button
              key={item}
              className="px-4 py-1.5 text-sm border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition"
            >
              {item}
            </button>
          ))}
        </div>

        {/* AI Response */}
        {response && (
          <div className="mt-6 bg-gray-100 p-4 rounded-xl shadow-sm">
            <h2 className="font-semibold mb-2 text-gray-700">AI Response:</h2>
            <p className="text-gray-800 whitespace-pre-line">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
