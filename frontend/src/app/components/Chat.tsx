"use client";

import { useEffect, useRef, useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import { BsStars } from "react-icons/bs";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const sessionId =
    typeof window !== "undefined"
      ? localStorage.getItem("sessionid") ??
        (() => {
          const id = crypto.randomUUID();
          localStorage.setItem("sessionId", id);
          return id;
        })()
      : "";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: input,
        sessionId,
      }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: data.message ?? "No response.",
      },
    ]);

    setLoading(false);
  }

  return (
    <div className="flex flex-col h-screen w-7xl mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-4">Mocha AI</h1>
      {messages.length > 0 ? (
        <div className="flex-1 overflow-y-auto flex flex-col justify-end no-scrollbar">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex flex-col ${
                m.role === "user" ? "items-end" : "items-start"
              }`}
            >
              <span
                className={`text-xs font-semibold mb-1 ${
                  m.role === "user" ? "text-blue-600" : "text-purple-600"
                }`}
              >
                {m.role === "user" ? "You" : "AI"}
              </span>
              <div
                className={`bg-white/50 border border-white rounded-lg w-fit max-w-6xl  p-2.5 ${
                  m.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            </div>
          ))}
          {loading && (
            <div className="bg-white/50 border border-white rounded-lg w-fit max-w-6xl  p-2.5 text-left">
              Typing...
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center gap-12">
          <BsStars size={36} />
          <h1 className="text-2xl">Hello! How can I help you today?</h1>
        </div>
      )}

      <div className="flex mt-4">
        <input
          type="text"
          className="flex-1 border border-r-0 border-black/30 rounded-l-lg px-2.5 py-4 bg-white text-[#56637E] focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask something..."
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-white px-4 border border-l-0 border-black/30 rounded-r-lg cursor-pointer"
        >
          <LuSendHorizontal size={36} color="rgba(69, 98, 136, 0.5)" />
        </button>
      </div>
    </div>
  );
}
