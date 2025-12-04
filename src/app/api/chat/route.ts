import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type {
    ChatCompletionMessageParam,
} from "openai/resources/chat/completions";
import { agentTools, AGENT_SYSTEM_PROMPT } from "@/services/agent/tools";
import { ejecutarToolCall } from "@/services/agent/agent.service";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const MODEL = "gpt-4o";

interface ChatRequestBody {
    messages: Array<{
        role: "user" | "assistant";
        content: string;
    }>;
}

interface ChatResponse {
    success: boolean;
    message?: string;
    error?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<ChatResponse>> {
    try {
        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { success: false, error: "OpenAI API key no configurada" },
                { status: 500 }
            );
        }

        const body: ChatRequestBody = await request.json();

        if (!body.messages || !Array.isArray(body.messages)) {
            return NextResponse.json(
                { success: false, error: "Se requiere un array de mensajes" },
                { status: 400 }
            );
        }

        const conversationHistory: ChatCompletionMessageParam[] = [
            { role: "system", content: AGENT_SYSTEM_PROMPT },
            ...body.messages.map((msg) => ({
                role: msg.role as "user" | "assistant",
                content: msg.content,
            })),
        ];

        let response = await openai.chat.completions.create({
            model: MODEL,
            messages: conversationHistory,
            tools: agentTools,
            tool_choice: "auto",
            temperature: 0.7,
        });

        let assistantMessage = response.choices[0].message;
        let toolCalls = assistantMessage.tool_calls;

        let iterations = 0;
        const maxIterations = 5;

        while (toolCalls && toolCalls.length > 0 && iterations < maxIterations) {
            iterations++;

            conversationHistory.push(assistantMessage as ChatCompletionMessageParam);

            for (const toolCall of toolCalls) {
                if (toolCall.type !== "function") continue;

                const functionName = toolCall.function.name;
                const functionArgs = JSON.parse(toolCall.function.arguments);

                console.log(`[Agent] Ejecutando tool: ${functionName}`, functionArgs);

                const toolResult = await ejecutarToolCall(functionName, functionArgs);

                conversationHistory.push({
                    role: "tool",
                    tool_call_id: toolCall.id,
                    content: toolResult,
                });
            }

            response = await openai.chat.completions.create({
                model: MODEL,
                messages: conversationHistory,
                tools: agentTools,
                tool_choice: "auto",
                temperature: 0.7,
            });

            assistantMessage = response.choices[0].message;
            toolCalls = assistantMessage.tool_calls;
        }

        const finalContent = assistantMessage.content ?? "Lo siento, no pude procesar tu solicitud.";

        return NextResponse.json({
            success: true,
            message: finalContent,
        });
    } catch (error) {
        console.error("[Agent] Error:", error);

        if (error instanceof OpenAI.APIError) {
            return NextResponse.json(
                {
                    success: false,
                    error: `Error de OpenAI: ${error.message}`,
                },
                { status: error.status ?? 500 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Error interno del servidor",
            },
            { status: 500 }
        );
    }
}

export async function GET(): Promise<NextResponse> {
    return NextResponse.json({
        status: "ok",
        message: "Chat API activa",
        hasApiKey: !!process.env.OPENAI_API_KEY,
    });
}
