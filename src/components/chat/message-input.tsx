"use client";

import { useState, type KeyboardEvent, type FormEvent } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MessageInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function MessageInput({ onSend, disabled = false }: MessageInputProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleSend();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-t border-border bg-card px-2 py-2"
    >
      <input
        className="h-10 flex-1 rounded-full border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/70 focus:border-primary focus:ring-0 disabled:opacity-50"
        placeholder="Escribe tu mensaje..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <Button
        type="submit"
        size="icon"
        className="h-10 w-10 rounded-full"
        aria-label="Enviar mensaje"
        disabled={!value.trim() || disabled}
      >
        {disabled ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
}