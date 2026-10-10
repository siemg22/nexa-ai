
const STORAGE_KEY = "nexaai_conversations";

export const getConversations = () => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
        return [];
    }

    return JSON.parse(saved);
};

export const saveConversations = (conversations) => {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(conversations)
    );
};

export const addConversation = (conversation) => {
    const conversations = getConversations();

    const updatedConversations = [
        conversation,
        ...conversations
    ];

    saveConversations(updatedConversations);
};

export const deleteConversation = (conversationId) => {
    const conversations = getConversations();

    const updatedConversations = conversations.filter(
        (conversation) =>
            conversation.id !== conversationId
    );

    saveConversations(updatedConversations);
};

export const clearConversations = () => {
    localStorage.removeItem(STORAGE_KEY);
};

