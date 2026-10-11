const BASE_SYSTEM_PROMPT = `You are NexaAI, an intelligent and helpful AI assistant.

Always answer the user's actual question directly and naturally.
Never introduce yourself unless asked.
Never claim that your name is Gemma, ChatGPT, or another AI model.
Do not send generic greetings instead of answering questions.
Use clear, accurate, relevant answers and format them with Markdown when useful.
For coding questions, provide working code and concise explanations.
If a question requires live information you cannot access, explain that limitation honestly. Never invent current facts.
Keep answers focused on the user's request.`;

const MAX_HISTORY_MESSAGES = 20;

const json = (data, status = 200) =>
    new Response(JSON.stringify(data), {
        status,
        headers: {
            "Content-Type": "application/json",
        },
    });

export default async (req) => {
    if (req.method !== "POST") {
        return json({ error: "Method not allowed" }, 405);
    }

    try {
        const apiKey = process.env.OPENROUTER_API_KEY;

        if (!apiKey) {
            return json(
                {
                    error:
                        "AI service is not configured (missing OPENROUTER_API_KEY).",
                },
                500
            );
        }

        const body = await req.json().catch(() => null);

        if (
            !body ||
            !Array.isArray(body.messages) ||
            body.messages.length === 0
        ) {
            return json(
                { error: "Please provide valid messages." },
                400
            );
        }

        const cleaned = body.messages
            .filter(
                (item) =>
                    item &&
                    ["system", "user", "assistant"].includes(item.role) &&
                    typeof item.content === "string" &&
                    item.content.trim().length > 0
            )
            .map((item) => ({
                role: item.role,
                content: item.content.trim(),
            }));

        const clientInstructions = cleaned
            .filter((item) => item.role === "system")
            .map((item) => item.content)
            .join("\n\n");

        const conversation = cleaned
            .filter((item) => item.role !== "system")
            .slice(-MAX_HISTORY_MESSAGES);

        if (conversation.length === 0) {
            return json(
                { error: "No valid messages were provided." },
                400
            );
        }

        const systemPrompt = clientInstructions
            ? `${BASE_SYSTEM_PROMPT}

For this request, follow these task-specific instructions (they take priority):
${clientInstructions}`
            : BASE_SYSTEM_PROMPT;

        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                    "HTTP-Referer":
                        process.env.URL || "http://localhost:8888",
                    "X-Title": "NexaAI",
                },
                body: JSON.stringify({
                    model:
                        process.env.OPENROUTER_MODEL || "openrouter/free",
                    messages: [
                        {
                            role: "system",
                            content: systemPrompt,
                        },
                        ...conversation,
                    ],
                }),
            }
        );

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            let message =
                data?.error?.message ||
                (typeof data?.error === "string"
                    ? data.error
                    : null) ||
                `AI provider returned an error (${response.status}).`;

            if (response.status === 429) {
                message =
                    "The AI is busy or the free usage limit was reached. Please wait a moment and try again.";
            } else if (response.status === 401) {
                message = "The AI API key is invalid or missing.";
            }

            console.error("OpenRouter error:", response.status, data);

            return json({ error: message }, response.status);
        }

        const text = data?.choices?.[0]?.message?.content;

        if (typeof text !== "string" || !text.trim()) {
            console.error(
                "OpenRouter returned no content:",
                JSON.stringify(data)
            );

            return json(
                {
                    error:
                        "The AI returned an empty response. Please try again.",
                },
                502
            );
        }

        return json({ text });
    } catch (error) {
        console.error("Netlify AI function error:", error);

        return json(
            { error: "Unable to connect to the AI service." },
            500
        );
    }
};