import { useState } from "react";

function Generator({ setHistory,
    credits,
    setCredits,
    setGenerations }) {
    const [prompt, setPrompt] = useState("");
const [result, setResult] = useState("");
const [tool, setTool] = useState("AI Writer");
const [loading, setLoading] = useState(false);
    const generateContent = async () => {
    if (!prompt.trim()) {
        return;
    }

    const creditCost =
        tool === "AI Writer"
            ? 10
            : tool === "AI Rewriter"
            ? 8
            : 5;

    if (credits < creditCost) {
        return;
    }

    setLoading(true);

    let instruction = "";

    if (tool === "AI Writer") {
        instruction = `
Write high-quality, professional content based on the user's request.
Make it clear, engaging, well-structured, and useful.
Do not mention that you are an AI unless necessary.
`;

    } else if (tool === "AI Rewriter") {
        instruction = `
Rewrite the user's text to make it clearer, more professional,
natural, and engaging while preserving the original meaning.
Return only the improved version.
`;

    } else if (tool === "Summarizer") {
        instruction = `
Summarize the user's text clearly.
Keep the most important information and remove unnecessary details.
Use concise paragraphs or bullet points when appropriate.
`;

    } else if (tool === "Idea Generator") {
        instruction = `
Generate creative and practical ideas based on the user's request.
Provide several useful ideas with a short explanation for each one.
`;
    }

    try {
        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${
                        import.meta.env.VITE_OPENROUTER_API_KEY
                    }`,
                },
                body: JSON.stringify({
                    model: "openrouter/free",
                    messages: [
                        {
                            role: "system",
                            content: instruction,
                        },
                        {
                            role: "user",
                            content: prompt,
                        },
                    ],
                }),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to generate content");
        }

        const data = await response.json();

        const generatedText =
            data.choices?.[0]?.message?.content;

        if (!generatedText) {
            throw new Error("No response received from AI");
        }

        setResult(generatedText);

        const newHistory = {
            id: Date.now(),
            title: prompt.slice(0, 40),
            tool: tool,
            prompt: prompt,
            result: generatedText,
            date: new Date().toLocaleString(),
        };

        setHistory((previousHistory) => [
            newHistory,
            ...previousHistory,
        ]);

        setCredits((previousCredits) =>
            previousCredits - creditCost
        );

        setGenerations((previousGenerations) =>
            previousGenerations + 1
        );

    } catch (error) {
        console.error(error);

        setResult(
            "Sorry, something went wrong while generating your content. Please try again."
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

                        <label>
                            Choose a tool
                        </label>

                        <select
                            value={tool}
                            onChange={(e) => setTool(e.target.value)}
                        >
                            <option>AI Writer</option>
                            <option>AI Rewriter</option>
                            <option>Summarizer</option>
                            <option>Idea Generator</option>
                        </select>

                    </div>

                    <div className="prompt-section">

                        <label>
                            Your prompt
                        </label>

                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Tell the AI what you want to create..."
                        />

                    </div>
                  <div className="generator-footer">

    <span>
        {prompt.length} characters
    </span>

    <div className="generator-actions">

        <span>
            ⚡ {credits} credits
        </span>

       <button
    onClick={generateContent}
    disabled={loading}
>
    {loading ? "Generating..." : "✨ Generate"}
</button>

    </div>

</div>
                    

                </div>

                <div className="result-panel">

                    <div className="result-header">
                        <h2>Result</h2>

                        {result && (
                            <button
                                onClick={() => setResult("")}
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    <div className="result-content">

                        {result ? (
                            <p>{result}</p>
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