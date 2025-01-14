import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import type { Message } from "@/types/chat";

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: "Hello! How can I help you with documentation today?",
};

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (content: string) => {
    // Add user message
    const userMessage: Message = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    
    // Simulate bot response
    setIsTyping(true);
    
    // In a real implementation, this is where you'd make an API call
    setTimeout(() => {
      const botMessage: Message = {
        role: "assistant",
        content: "I'm a demo chatbot. In the full implementation, I'll be able to answer questions about Segment, mParticle, Lytics, and Zeotap documentation.",
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="mx-auto flex h-screen max-w-3xl flex-col overflow-hidden p-4 pt-8">
      <div className="mb-4">
        <h1 className="text-center text-2xl font-semibold">Documentation Assistant</h1>
        <p className="text-center text-sm text-muted-foreground">
          Ask questions about Segment, mParticle, Lytics, and Zeotap documentation
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto rounded-2xl border bg-secondary/50 shadow-sm">
        <div className="h-full overflow-y-auto p-4 scrollbar-hidden">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput onSend={handleSend} disabled={isTyping} />
    </div>
  );
};

export default Index;