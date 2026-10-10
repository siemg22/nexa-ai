import { useState } from "react";
function History({ history }) {
    const [selectedConversation, setSelectedConversation] = useState(null);
    return (
        <section className="history-page">
            <div className="page-header">
                <div>
                    <p className="page-label">YOUR ACTIVITY</p>
                    <h1>History</h1>
                    <p>View and manage your previous AI conversations.</p>
                </div>
            </div>
           {selectedConversation && (
    <div className="conversation-view">
        <div className="conversation-view-header">
            <div>
                <p className="page-label">SAVED CONVERSATION</p>

                <h2>{selectedConversation.title}</h2>

                <p>
                    {selectedConversation.createdAt
                        ? new Date(
                              selectedConversation.createdAt
                          ).toLocaleDateString()
                        : selectedConversation.date}
                </p>
            </div>

            <button
                className="conversation-close"
                onClick={() => setSelectedConversation(null)}
            >
                ×
            </button>
        </div>

        <div className="conversation-messages">
            {selectedConversation.messages ? (
                selectedConversation.messages.map((item) => (
                    <div
                        key={item.id}
                        className={`message ${item.sender}`}
                    >
                        <div className="message-avatar">
                            {item.sender === "user" ? "S" : "✦"}
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

                            <p>{item.text}</p>
                        </div>
                    </div>
                ))
            ) : (
                <div className="old-conversation">
                    <p>{selectedConversation.result}</p>
                </div>
            )}
        </div>
    </div>
)}

            <div className="history-container">
                {history.length === 0 ? (
                    <div className="empty-history">
                        <div className="empty-history-icon">🕘</div>

                        <h2>No conversations yet</h2>

                        <p>
                            Your AI conversations will appear here.
                        </p>
                    </div>
                ) : (
                    history.map((conversation) => {
                        const firstUserMessage = conversation.messages?.find(
                            (item) => item.sender === "user"
                        );

                        const lastAiMessage = [...(
                            conversation.messages || []
                        )]
                            .reverse()
                            .find((item) => item.sender === "ai");

                        return (
                            <div
                                className="history-item"
                                key={conversation.id}
                            >
                                <div className="history-icon">
                                    ✦
                                </div>

                                <div className="history-info">
                                    <h3>
                                        {conversation.title}
                                    </h3>

                                   <p>
    {lastAiMessage
        ? lastAiMessage.text.slice(0, 120)
        : firstUserMessage
            ? firstUserMessage.text.slice(0, 120)
            : conversation.result
                ? conversation.result.slice(0, 120)
                : "Empty conversation"}

    {(lastAiMessage?.text.length > 120 ||
        (!lastAiMessage &&
            !firstUserMessage &&
            conversation.result?.length > 120))
        ? "..."
        : ""}
</p>

                                    <div className="history-meta">
    <span>AI Chat</span>

    <span>•</span>

    <span>
        {conversation.createdAt
            ? new Date(
                  conversation.createdAt
              ).toLocaleDateString()
            : conversation.date}
    </span>

    <span>•</span>

    <span>
        {conversation.messages
            ? `${conversation.messages.length} messages`
            : "Previous conversation"}
    </span>
</div>
                                </div>

                                <button className="history-action"
                                 onClick={() => setSelectedConversation(conversation)}
                                >
                                    →
                                </button>
                            </div>
                        );
                    })
                )}
            </div>
        </section>
    );
}

export default History;