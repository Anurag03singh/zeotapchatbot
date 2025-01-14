import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isBot = message.role === "assistant";

  return (
    <div
      className={cn(
        "flex w-full animate-message-fade-in items-end gap-2 py-2",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "relative max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
          isBot
            ? "bg-chat-bot text-foreground shadow-gray-100"
            : "bg-chat-user text-foreground shadow-blue-50"
        )}
      >
        <p className="whitespace-pre-wrap text-sm">{message.content}</p>
      </div>
    </div>
  );
};