"use client";

import { MessageCircle, X } from "lucide-react";
import { useChatStore } from "@/store/chat.store";
import { MessageList } from "./message-list";
import { MessageInput } from "./message-input";

const QUICK_REPLIES = [
  "Quiero ver propiedades en venta",
  "Busco apartamento en alquiler",
  "Necesito calcular una hipoteca",
];

export function ChatWidget() {
  const { isOpen, isLoading, error, messages, open, toggle, sendMessage, clearError } = useChatStore();

  const showQuickReplies = messages.length === 0 && !isLoading;

  const handleQuickReply = (text: string) => {
    sendMessage(text);
  };

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={open}
          className="fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:scale-105 hover:shadow-xl"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-40 w-full max-w-sm">
          <div className="flex h-[480px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <div className="flex items-center justify-between border-b border-border bg-primary/95 px-4 py-3 text-primary-foreground">
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Laura - Asistente</span>
                <span className="text-[11px] opacity-85">
                  CasaIdeal Inmobiliaria
                </span>
              </div>
              <button
                type="button"
                onClick={toggle}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 hover:bg-primary/30"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-1 flex-col overflow-hidden bg-muted/20">
              <MessageList messages={messages} isLoading={isLoading} />

              {error && (
                <div className="mx-2 mb-2 flex items-center justify-between rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
                  <span>{error}</span>
                  <button onClick={clearError} className="underline">
                    Cerrar
                  </button>
                </div>
              )}

              {showQuickReplies && (
                <div className="space-y-2 border-t border-border px-2 pb-2 pt-2">
                  <p className="px-1 text-[11px] font-medium text-muted-foreground">
                    Elige una opción para empezar:
                  </p>
                  <div className="flex flex-wrap gap-2 px-1">
                    {QUICK_REPLIES.map((text) => (
                      <button
                        key={text}
                        type="button"
                        onClick={() => handleQuickReply(text)}
                        className="rounded-full border border-border bg-card px-3 py-1 text-left text-[11px] text-foreground shadow-sm transition hover:border-primary hover:bg-primary/5"
                      >
                        {text}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <MessageInput onSend={sendMessage} disabled={isLoading} />
          </div>
        </div>
      )}
    </>
  );
}