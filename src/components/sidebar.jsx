
function Sidebar({ currentPage, setCurrentPage, isOpen, onClose }) {
    const navigateTo = (page) => {
        setCurrentPage(page);
        onClose();
    };

    return (
        <>
            {isOpen && (
                <button
                    className="sidebar-overlay"
                    aria-label="Close navigation menu"
                    onClick={onClose}
                />
            )}

            <aside
                className={`sidebar ${isOpen ? "sidebar-open" : ""}`}
            >
                <button
                    className="sidebar-close-btn"
                    onClick={onClose}
                    aria-label="Close sidebar"
                >
                    ✕
                </button>

                <div className="sidebar-menu">
                    <button
                        className={currentPage === "dashboard" ? "active" : ""}
                        onClick={() => navigateTo("dashboard")}
                    >
                        🏠 <span>Dashboard</span>
                    </button>

                    <button
                        className={currentPage === "generator" ? "active" : ""}
                        onClick={() => navigateTo("generator")}
                    >
                        ✨ <span>AI Generator</span>
                    </button>

                    <button
                        className={currentPage === "chat" ? "active" : ""}
                        onClick={() => navigateTo("chat")}
                    >
                        💬 <span>AI Chat</span>
                    </button>

                    <button
                        className={currentPage === "history" ? "active" : ""}
                        onClick={() => navigateTo("history")}
                    >
                        🕘 <span>History</span>
                    </button>

                    <button
                        className={currentPage === "usage" ? "active" : ""}
                        onClick={() => navigateTo("usage")}
                    >
                        📊 <span>Usage</span>
                    </button>

                    <button
                        className={currentPage === "settings" ? "active" : ""}
                        onClick={() => navigateTo("settings")}
                    >
                        ⚙️ <span>Settings</span>
                    </button>
                </div>

                <div className="sidebar-bottom">
                    <div className="upgrade-card">
                        <div className="upgrade-icon">✦</div>
                        <h3>Upgrade to Pro</h3>
                        <p>
                            Get more credits and unlock advanced AI tools.
                        </p>
                        <button>Upgrade</button>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
