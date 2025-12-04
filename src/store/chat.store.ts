import { create } from "zustand";

export type ChatMessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatMessageRole;
  content: string;
  createdAt: Date;
}

interface ChatState {
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  messages: ChatMessage[];

  open: () => void;
  close: () => void;
  toggle: () => void;
  sendMessage: (content: string) => Promise<void>;
  reset: () => void;
  clearError: () => void;
}

function generateId(): string {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function createMessage(role: ChatMessageRole, content: string): ChatMessage {
  return {
    id: generateId(),
    role,
    content,
    createdAt: new Date(),
  };
}

interface ChatApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

async function sendToAgent(messages: ChatMessage[]): Promise<ChatApiResponse> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    }),
  });

  const data: ChatApiResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? `Error ${response.status}`);
  }

  return data;
}

export const useChatStore = create<ChatState>((set, get) => ({
  isOpen: false,
  isLoading: false,
  error: null,
  messages: [],

  open: () => {
    set({ isOpen: true });
    const { messages, sendMessage } = get();
    if (messages.length === 0) {
      sendMessage("Hola");
    }
  },

  close: () => set({ isOpen: false }),

  toggle: () => {
    const { isOpen, open, close } = get();
    isOpen ? close() : open();
  },

  sendMessage: async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed) return;

    const { messages } = get();
    const userMessage = createMessage("user", trimmed);

    set((state) => ({
      messages: [...state.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      const allMessages = [...messages, userMessage];
      const response = await sendToAgent(allMessages);

      if (response.success && response.message) {
        const assistantMessage = createMessage("assistant", response.message);
        set((state) => ({
          messages: [...state.messages, assistantMessage],
          isLoading: false,
        }));
      } else {
        throw new Error(response.error ?? "Respuesta inválida");
      }
    } catch (error) {
      console.error("[Chat] Error:", error);
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Error al enviar mensaje",
      });
    }
  },

  reset: () => set({ messages: [], error: null, isLoading: false }),
  clearError: () => set({ error: null }),
}));