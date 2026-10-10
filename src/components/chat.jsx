import { useState } from "react";

function Chat({setHistory}) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!message.trim() || loading) {
            return;
        }

        const userText = message.trim();

        const userMessage = {
            id: Date.now(),
            sender: "user",
            text: userText,
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            })
        };

        setMessages((previousMessages) => [
            ...previousMessages,
            userMessage
        ]);

        setMessage("");
        setLoading(true);

        try {
            const response = await fetch(
                "https://openrouter.ai/api/v1/chat/completions",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`
                    },

                    body: JSON.stringify({
                        model: "openrouter/free",

                        messages: [
                            {
                                role: "system",
                                content:
                                    "You are NexaAI, a helpful, friendly and professional AI assistant."
                            },

                            ...messages.map((item) => ({
                                role:
                                    item.sender === "user"
                                        ? "user"
                                        : "assistant",
                                content: item.text
                            })),

                            {
                                role: "user",
                                content: userText
                            }
                        ]
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.error?.message ||
                    "Something went wrong with the AI request."
                );
            }

            const aiText =
                data?.choices?.[0]?.message?.content ||
                "Sorry, I couldn't generate a response.";

            const aiMessage = {
                id: Date.now() + 1,
                sender: "ai",
                text: aiText,
                time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                })
            };
           

            setMessages((previousMessages) => [
                ...previousMessages,
                aiMessage
            ]);
        } catch (error) {
            console.error("OpenRouter error:", error);

            const errorMessage = {
                id: Date.now() + 1,
                sender: "ai",
                text: `Sorry, I couldn't connect to the AI right now. ${error.message}`,
                time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                })
            };

            setMessages((previousMessages) => [
                ...previousMessages,
                errorMessage
            ]);
        } finally {
            setLoading(false);
        }
    };
     const clearChat = () => {
    if (messages.length === 0) {
        return;
    }

    const firstUserMessage = messages.find(
        (item) => item.sender === "user"
    );
    

    const conversation = {
        id: Date.now(),
        title: firstUserMessage
            ? firstUserMessage.text.slice(0, 40)
            : "New conversation",
        messages: messages,
        createdAt: new Date().toISOString()
    };
      setHistory((previousHistory) => [
        conversation,
        ...previousHistory
    ]);


    setMessages([]);
};
   

    return (
        <section className="chat-page">

            <div className="page-header chat-page-header">

                <div>
                    <p className="page-label">
                        AI ASSISTANT
                    </p>

                    <h1>AI Chat</h1>

                    <p>
                        Ask questions, brainstorm ideas and get help.
                    </p>
                </div>

                {messages.length > 0 && (
                    <button
                        className="clear-chat-btn"
                        onClick={clearChat}
                    >
                        + New Chat
                    </button>
                )}

            </div>

            <div className="chat-container">

                <div className="messages">

                    {messages.length === 0 ? (

                        <div className="empty-chat">

                            <div className="chat-icon">
                                ✦
                            </div>

                            <h2>
                                How can I help you?
                            </h2>

                            <p>
                                Ask me anything or choose a suggestion below.
                            </p>

                            <div className="chat-suggestions">

                                <button
                                    onClick={() =>
                                        setMessage(
                                            "Give me some startup ideas"
                                        )
                                    }
                                >
                                    💡 Give me startup ideas
                                </button>

                                <button
                                    onClick={() =>
                                        setMessage(
                                            "Help me learn React"
                                        )
                                    }
                                >
                                    ⚛️ Help me learn React
                                </button>

                                <button
                                    onClick={() =>
                                        setMessage(
                                            "Write a professional email"
                                        )
                                    }
                                >
                                    ✉️ Write an email
                                </button>

                            </div>

                        </div>

                    ) : (

                        <div className="message-list">

                            {messages.map((item) => (

                                <div
                                    key={item.id}
                                    className={`message ${item.sender}`}
                                >

                                    <div className="message-avatar">
                                        {item.sender === "user"
                                            ? "S"
                                            : "✦"}
                                    </div>

                                    <div className="message-body">

                                        <div className="message-top">
                                            <strong>
                                                {item.sender === "user"
                                                    ? "You"
                                                    : "NexaAI"}
                                            </strong>

                                            <span>
                                                {item.time}
                                            </span>
                                        </div>

                                        <p>
                                            {item.text}
                                        </p>

                                    </div>

                                </div>

                            ))}

                            {loading && (

                                <div className="message ai">

                                    <div className="message-avatar">
                                        ✦
                                    </div>

                                    <div className="message-body">

                                        <div className="message-top">
                                            <strong>
                                                NexaAI
                                            </strong>
                                        </div>

                                        <div className="typing">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>

                                    </div>

                                </div>

                            )}

                        </div>

                    )}

                </div>

                <div className="chat-input">

                    <textarea
                        value={message}
                        onChange={(e) =>
                            setMessage(e.target.value)
                        }
                        placeholder="Message NexaAI..."
                        rows="1"
                        onKeyDown={(e) => {
                            if (
                                e.key === "Enter" &&
                                !e.shiftKey
                            ) {
                                e.preventDefault();
                                sendMessage();
                            }
                        }}
                    />

                    <button
                        onClick={sendMessage}
                        disabled={
                            !message.trim() || loading
                        }
                    >
                        ↑
                    </button>

                </div>

                <p className="chat-disclaimer">
                    NexaAI can make mistakes. Check important information.
                </p>

            </div>

        </section>
    );
}

export default Chat;

