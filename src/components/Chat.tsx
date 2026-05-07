"use client";

import { useState, useRef, useEffect } from "react";
import { SendHorizonal, LoaderCircle, Sun, Moon, Trash2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserMessage } from "./UserMessage";
import { BotMessage } from "./BotMessage";
import { getAIResponse } from "@/app/actions";
import { useLanguage } from "./LanguageProvider";

type Message = {
  id: number;
  role: "user" | "bot";
  content: string;
  time: string;
};

function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleDark = () => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove("dark");
    } else {
      html.classList.add("dark");
    }
    setIsDark(!isDark);
  };

  const clearChat = () => {
    setMessages([]);
  };

  const copyMessage = (content: string, id: number) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now(), role: "user", content: input, time: getTime() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await getAIResponse(input, language);
      const botMessage: Message = { id: Date.now() + 1, role: "bot", content: response, time: getTime() };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now() + 1,
        role: "bot",
        content: "Sorry, I'm having trouble connecting. Please try again later.",
        time: getTime(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100svh-4rem)] md:max-h-[calc(100svh-4.5rem)]">
      {/* Toolbar */}
      <div className="flex items-center justify-end gap-2 px-4 py-2 border-b border-primary/20">
        {messages.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearChat}
            className="text-xs text-foreground/60 hover:text-red-500 gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Clear Chat
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDark}
          className="w-8 h-8 rounded-full border border-primary/30"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-primary" />}
        </Button>
      </div>

      {/* Messages */}
      <div
        ref={scrollAreaRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <h2 className="text-3xl font-bold font-headline text-foreground">Ask VaidyaAI Anything</h2>
            <p className="max-w-md mt-3 text-base font-semibold text-foreground">
              Aapki Sehat, Hamari Zimmedari — Get instant answers on diseases, symptoms, and prevention.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {[
                "What are the symptoms of dengue?",
                "How to prevent malaria?",
                "What is diabetes?",
                "How to stay healthy in monsoon?",
                "What are signs of dehydration?",
                "How to boost immunity?",
              ].map((question) => (
                <button
                  key={question}
                  onClick={() => setInput(question)}
                  className="px-4 py-2 rounded-full border-2 border-primary text-sm font-semibold text-primary bg-primary/10 hover:bg-primary/20 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
            <p className="text-sm mt-6 text-foreground/70">Or type your own question below ↓</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id}>
              {message.role === "user" ? (
                <div>
                  <UserMessage>{message.content}</UserMessage>
                  <p className="text-xs text-foreground/40 text-right mt-1 mr-12">{message.time}</p>
                </div>
              ) : (
                <div>
                  <BotMessage>{message.content}</BotMessage>
                  <div className="flex items-center gap-2 mt-1 ml-12">
                    <p className="text-xs text-foreground/40">{message.time}</p>
                    <button
                      onClick={() => copyMessage(message.content, message.id)}
                      className="text-xs text-foreground/40 hover:text-primary flex items-center gap-1 transition-colors"
                    >
                      {copiedId === message.id ? (
                        <><Check className="w-3 h-3 text-green-500" /> <span className="text-green-500">Copied!</span></>
                      ) : (
                        <><Copy className="w-3 h-3" /> Copy</>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-primary border-2 border-primary shadow-md shrink-0 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-primary mb-1 ml-1">VaidyaAI</p>
              <div className="bg-white border border-primary/20 shadow-md rounded-2xl rounded-tl-none px-5 py-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-background/80 backdrop-blur-sm border-t">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a health question..."
            className="flex-1 border-2 border-primary rounded-lg font-semibold text-foreground placeholder:text-foreground/50"
            disabled={isLoading}
            aria-label="Chat input"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()} variant="default" className="bg-primary hover:bg-primary/90">
            <SendHorizonal className="w-5 h-5" />
            <span className="sr-only">Send Message</span>
          </Button>
        </form>
        <p className="text-xs text-center text-foreground/50 mt-2">
          VaidyaAI is an AI assistant and may produce inaccurate information. Consult a medical professional for advice.
        </p>
      </div>
    </div>
  );
}