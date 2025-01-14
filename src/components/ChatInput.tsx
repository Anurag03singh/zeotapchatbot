import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [message]);

  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex items-end gap-2 border-t bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Textarea
        ref={textareaRef}
        rows={1}
        placeholder="Ask a question..."
        className="min-h-[44px] max-h-[200px] resize-none rounded-xl px-4 py-3"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <Button
        size="icon"
        className="h-11 w-11 shrink-0 rounded-xl"
        onClick={handleSubmit}
        disabled={!message.trim() || disabled}
      >
        <SendHorizontal className="h-5 w-5" />
      </Button>
    </div>
  );
};