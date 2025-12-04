"use client";

import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import type { ChatMessage } from "@/store/chat.store";

interface MessageListProps {
  messages: ChatMessage[];
  isLoading?: boolean;
}

export function MessageList({ messages, isLoading = false }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isLoading]);

  const formatTime = (date: Date) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex flex-1 flex-col justify-center px-3 text-center text-xs text-muted-foreground">
        <p>¡Hola! Soy Laura, tu asistente inmobiliaria.</p>
        <p className="mt-1">¿En qué puedo ayudarte hoy?</p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-3 overflow-y-auto px-2 py-2 text-sm">
      {messages.map((message) => {
        const isUser = message.role === "user";

        return (
          <div
            key={message.id}
            className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
          >
            <div className="max-w-[85%]">
              <div
                className={`rounded-2xl px-3 py-2 ${
                  isUser
                    ? "rounded-br-sm bg-primary text-primary-foreground"
                    : "rounded-bl-sm bg-muted text-foreground"
                }`}
              >
                <p className="whitespace-pre-line">{message.content}</p>
              </div>
              <div className="mt-0.5 text-[10px] text-muted-foreground">
                <span>{formatTime(message.createdAt)}</span>
              </div>
            </div>
          </div>
        );
      })}

      {isLoading && (
        <div className="flex justify-start">
          <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm bg-muted px-3 py-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Laura está escribiendo...</span>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}