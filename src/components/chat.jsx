import { useEffect, useRef, useState } from "react";

function Chat({ setHistory }) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);

    const getTime = () =>
        new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [messages, loading]);

    const sendMessage = async (text = message) => {
        if (!text.trim() || loading) return;

        const userText = text.trim();

        const userMessage = {
            id: Date.now(),
            sender: "user",
            text: userText,
            time: getTime(),
        };

        const conversationHistory = messages
            .filter((item) => !item.isError)
            .slice(-20)
            .map((item) => ({
                role: item.sender === "user" ? "user" : "assistant",
                content: item.text,
            }));

        setMessages((previous) => [...previous, userMessage]);
        setMessage("");
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
                            ...conversationHistory,
                            {
                                role: "user",
                                content: userText,
                            },
                        ],
                    }),
                }
            );

            const data = await response.json().catch(() => null);

            if (!response.ok || !data?.text) {
                if (response.status === 404) {
                    throw new Error(
                        "The AI function was not found. Run the app with netlify dev or deploy it to Netlify."
                    );
                }

                throw new Error(
                    data?.error ||
                        `Something went wrong (${response.status}).`
                );
            }

            setMessages((previous) => [
                ...previous,
                {
                    id: Date.now() + 1,
                    sender: "ai",
                    text: data.text,
                    time: getTime(),
                },
            ]);
        } catch (error) {
            console.error("Chat error:", error);

            setMessages((previous) => [
                ...previous,
                {
                    id: Date.now() + 1,
                    sender: "ai",
                    isError: true,
                    text: `Sorry, I couldn't get a response. ${error.message}`,
                    time: getTime(),
                },
            ]);
        } finally {
            setLoading(false);
            textareaRef.current?.focus();
        }
    };

    const clearChat = () => {
        if (messages.length === 0 || loading) return;

        const firstUserMessage = messages.find(
            (item) => item.sender === "user"
        );

        setHistory((previousHistory) => [
            {
                id: Date.now(),
                title: firstUserMessage
                    ? firstUserMessage.text.slice(0, 40)
                    : "New conversation",
                messages,
                createdAt: new Date().toISOString(),
            },
            ...previousHistory,
        ]);

        setMessages([]);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };

    const suggestions = [
        "Explain a coding concept",
        "Help me debug my code",
        "Give me project ideas",
    ];

    return (
        <section className="chat-page">
            <header className="page-header chat-page-header">
                <div>
                    <p className="page-label">AI ASSISTANT</p>
                    <h1>AI Chat</h1>
                    <p>
                        Ask questions, explore ideas, and solve problems
                        with NexaAI.
                    </p>
                </div>

                {messages.length > 0 && (
                    <button
                        type="button"
                        className="clear-chat-btn"
                        onClick={clearChat}
                        disabled={loading}
                    >
                        Clear conversation
                    </button>
                )}
            </header>

            <div className="chat-container">
                <div className="messages">
                    {messages.length === 0 ? (
                        <div className="empty-chat">
                            <span className="chat-icon">✦</span>
                            <h2>How can I help you today?</h2>
                            <p>
                                Ask a question or choose a suggestion
                                to get started.
                            </p>

                            <div className="chat-suggestions">
                                {suggestions.map((suggestion) => (
                                    <button
                                        type="button"
                                        key={suggestion}
                                        onClick={() =>
                                            sendMessage(suggestion)
                                        }
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="message-list">
                            {messages.map((item) => (
                                <article
                                    key={item.id}
                                    className={`message ${
                                        item.sender === "user"
                                            ? "user"
                                            : "ai"
                                    } ${item.isError ? "error-message" : ""}`}
                                >
                                    <div className="message-avatar">
                                        {item.sender === "user" ? "You" : "✦"}
                                    </div>

                                    <div className="message-body">
                                        <div className="message-top">
                                            <strong>
                                                {item.sender === "user"
                                                    ? "You"
                                                    : "NexaAI"}
                                            </strong>
                                            <span>{item.time}</span>
                                        </div>

                                        <p
                                            style={{
                                                whiteSpace: "pre-wrap",
                                            }}
                                        >
                                            {item.text}
                                        </p>
                                    </div>
                                </article>
                            ))}

                            {loading && (
                                <article className="message ai">
                                    <div className="message-avatar">✦</div>

                                    <div className="message-body">
                                        <div className="message-top">
                                            <strong>NexaAI</strong>
                                        </div>

                                        <div
                                            className="typing"
                                            role="status"
                                            aria-label="NexaAI is thinking"
                                        >
                                            <span />
                                            <span />
                                            <span />
                                        </div>
                                    </div>
                                </article>
                            )}

                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                <form
                    className="chat-input"
                    onSubmit={(event) => {
                        event.preventDefault();
                        sendMessage();
                    }}
                >
                    <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={(event) =>
                            setMessage(event.target.value)
                        }
                        onKeyDown={handleKeyDown}
                        placeholder="Message NexaAI..."
                        aria-label="Message NexaAI"
                        rows={1}
                        disabled={loading}
                    />

                    <button
                        type="submit"
                        aria-label="Send message"
                        disabled={loading || !message.trim()}
                    >
                        {loading ? "…" : "↑"}
                    </button>
                </form>

                <p className="chat-disclaimer">
                    Enter to send · Shift + Enter for a new line
                </p>
            </div>
        </section>
    );
}

export default Chat;
