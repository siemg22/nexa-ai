import { useState } from "react";

const TOOL_COSTS = {
    "AI Writer": 10,
    "AI Rewriter": 8,
    "Summarizer": 5,
    "Idea Generator": 5,
};

const TOOL_INSTRUCTIONS = {
    "AI Writer": `Write high-quality, professional content based on the user's request.
Make it clear, engaging, well-structured, and useful.
Do not mention that you are an AI unless necessary.`,

    "AI Rewriter": `Rewrite the user's text to make it clearer, more professional,
natural, and engaging while preserving the original meaning.
Return only the improved version.`,

    Summarizer: `Summarize the user's text clearly.
Keep the most important information and remove unnecessary details.
Use concise paragraphs or bullet points when appropriate.`,

    "Idea Generator": `Generate creative and practical ideas based on the user's request.
Provide several useful ideas with a short explanation for each one.`,
};

function Generator({
    setHistory,
    credits,
    setCredits,
    setGenerations,
}) {
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState("");
    const [tool, setTool] = useState("AI Writer");
    const [loading, setLoading] = useState(false);

    const generateContent = async () => {
        if (!prompt.trim() || loading) {
            return;
        }

        const cleanPrompt = prompt.trim();
        const creditCost = TOOL_COSTS[tool] ?? 5;

        if (credits < creditCost) {
            setResult(
                `You need ${creditCost} credits to use ${tool}, but you only have ${credits}.`
            );
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "/.netlify/functions/chat",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        messages: [
                            {
                                role: "system",
                                content: TOOL_INSTRUCTIONS[tool],
                            },
                            {
                                role: "user",
                                content: cleanPrompt,
                            },
                        ],
                    }),
                }
            );

            const data = await response.json().catch(() => null);

            if (!response.ok || !data?.text) {
                if (response.status === 404) {
                    throw new Error(
                        "The AI function was not found. Run the app with `netlify dev` (not `npm run dev`) or deploy it to Netlify."
                    );
                }

                throw new Error(
                    data?.error ||
                        `Failed to generate content (${response.status}).`
                );
            }

            const generatedText = data.text;

            setResult(generatedText);

            const newHistory = {
                id: Date.now(),
                title: cleanPrompt.slice(0, 40),
                tool,
                prompt: cleanPrompt,
                result: generatedText,
                date: new Date().toLocaleString(),
            };

            setHistory((previousHistory) => [
                newHistory,
                ...previousHistory,
            ]);

            setCredits(
                (previousCredits) => previousCredits - creditCost
            );

            setGenerations(
                (previousGenerations) => previousGenerations + 1
            );
        } catch (error) {
            console.error("Generator error:", error);

            setResult(
                `Sorry, something went wrong while generating your content. ${error.message}`
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="generator">
            <div className="page-header">
                <div>
                    <p className="page-label">AI TOOLS</p>

                    <h1>AI Generator</h1>

                    <p>
                        Create high-quality content with the power of AI.
                    </p>
                </div>
            </div>

            <div className="generator-container">
                <div className="generator-panel">
                    <div className="tool-selector">
                        <label htmlFor="generator-tool">
                            Choose a tool
                        </label>

                        <select
                            id="generator-tool"
                            value={tool}
                            onChange={(event) =>
                                setTool(event.target.value)
                            }
                            disabled={loading}
                        >
                            <option>AI Writer</option>
                            <option>AI Rewriter</option>
                            <option>Summarizer</option>
                            <option>Idea Generator</option>
                        </select>
                    </div>

                    <div className="prompt-section">
                        <label htmlFor="generator-prompt">
                            Your prompt
                        </label>

                        <textarea
                            id="generator-prompt"
                            value={prompt}
                            onChange={(event) =>
                                setPrompt(event.target.value)
                            }
                            placeholder="Tell the AI what you want to create..."
                            disabled={loading}
                        />
                    </div>

                    <div className="generator-footer">
                        <span>{prompt.length} characters</span>

                        <div className="generator-actions">
                            <span>⚡ {credits} credits</span>

                            <button
                                type="button"
                                onClick={generateContent}
                                disabled={loading || !prompt.trim()}
                            >
                                {loading
                                    ? "Generating..."
                                    : "✨ Generate"}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="result-panel">
                    <div className="result-header">
                        <h2>Result</h2>

                        {result && (
                            <button
                                type="button"
                                onClick={() => setResult("")}
                                disabled={loading}
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    <div className="result-content">
                        {result ? (
                            <p style={{ whiteSpace: "pre-wrap" }}>
                                {result}
                            </p>
                        ) : (
                            <div className="empty-result">
                                <span>✨</span>

                                <h3>
                                    Your result will appear here
                                </h3>

                                <p>
                                    Enter a prompt and click Generate
                                    to create content.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Generator;