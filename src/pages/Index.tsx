import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { findRelevantDocs, mockDocumentation } from "@/utils/documentationProcessor";
import type { Message } from "@/types/chat";
import { toast } from "sonner";

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: "Hi! I'm your CDP Support Agent. How can I assist you with Segment, mParticle, Lytics, or Zeotap today? Feel free to ask about features, comparisons, or step-by-step guides!",
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

  const processQuery = async (query: string) => {
    try {
      console.log("Processing query:", query);
      const relevantDocs = findRelevantDocs(query, mockDocumentation);
      
      if (relevantDocs.length === 0) {
        return "I couldn't find specific documentation for that query. Could you please rephrase or be more specific?";
      }

      // Enhanced response formatting for comparison queries
      const isComparison = query.toLowerCase().includes(' vs ') || 
        query.toLowerCase().includes('compare') || 
        query.toLowerCase().includes('difference');

      if (isComparison) {
        return `Here's a comparison of the CDPs you asked about:\n\n${relevantDocs
          .map(doc => `📊 ${doc.title}\n${doc.content}\nLearn more: ${doc.url}\n`)
          .join("\n")}`;
      }

      // Enhanced response formatting for how-to queries
      const isHowTo = query.toLowerCase().includes('how to');
      if (isHowTo) {
        return `Here's a step-by-step guide:\n\n${relevantDocs
          .map(doc => `📝 ${doc.title}\n${doc.content}\nDetailed guide: ${doc.url}\n`)
          .join("\n")}`;
      }

      // Default response format
      return `Here's what I found:\n\n${relevantDocs
        .map(
          (doc, index) =>
            `${index + 1}. ${doc.title}\n${doc.content}\nRead more: ${doc.url}\n`
        )
        .join("\n")}`;
    } catch (error) {
      console.error("Error processing query:", error);
      toast.error("Error processing your query. Please try again.");
      return "I encountered an error while processing your query. Please try again.";
    }
  };

  const handleSend = async (content: string) => {
    // Add user message
    const userMessage: Message = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    
    try {
      // Process the query and get response
      const response = await processQuery(content);
      
      // Add bot response
      const botMessage: Message = {
        role: "assistant",
        content: response,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error in chat:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="mx-auto flex h-screen max-w-3xl flex-col overflow-hidden p-4 pt-8">
      <div className="mb-4">
        <h1 className="text-center text-2xl font-semibold">CDP Support Agent</h1>
        <p className="text-center text-sm text-muted-foreground">
          Your expert guide for CDP platforms - Ask me anything!
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