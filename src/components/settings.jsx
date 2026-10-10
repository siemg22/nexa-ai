import { useEffect, useState } from "react";

function Settings() {
    const [name, setName] = useState(() => {
    return localStorage.getItem("nexaai-name") || "Siem";
});

const [email, setEmail] = useState(() => {
    return localStorage.getItem("nexaai-email") || "siem@example.com";
});
    const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("nexaai-dark-mode") === "true";
});
 
    const [notifications, setNotifications] = useState(true);
      useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);

    localStorage.setItem(
        "nexaai-dark-mode",
        darkMode
    );
}, [darkMode]);
    return (
        <section className="settings-page">

            <div className="page-header">
                <div>
                    <p className="page-label">ACCOUNT</p>

                    <h1>Settings</h1>

                    <p>
                        Manage your account and application preferences.
                    </p>
                </div>
            </div>

            <div className="settings-container">

                <div className="settings-section">

                    <div className="settings-section-header">
                        <h2>Profile</h2>

                        <p>
                            Manage your personal information.
                        </p>
                    </div>

                    <div className="profile-settings">

                        <div className="large-avatar">
                            S
                        </div>

                        <div className="profile-fields">

                            <div className="field">
                                <label>
                                    Full Name
                                </label>

                                <input
                                     type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="field">
                                <label>
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                        </div>

                    </div>

                    <button className="save-btn"
                         onClick={() => {
                    localStorage.setItem("nexaai-name", name);
                    localStorage.setItem("nexaai-email", email);
                    alert("Profile updated successfully!");
                }}
                    >
                        Save Changes
                    </button>

                </div>

                <div className="settings-section">

                    <div className="settings-section-header">
                        <h2>Preferences</h2>

                        <p>
                            Customize your NexaAI experience.
                        </p>
                    </div>

                    <div className="setting-option">

                        <div>
                            <h3>Dark Mode</h3>

                            <p>
                                Use a darker appearance throughout
                                the application.
                            </p>
                        </div>

                        <button
                            className={`toggle ${darkMode ? "on" : ""}`}
                            onClick={() => setDarkMode(!darkMode)}
                        >
                            <span></span>
                        </button>

                    </div>

                    <div className="setting-option">

                        <div>
                            <h3>Notifications</h3>

                            <p>
                                Receive notifications about your
                                AI usage and account.
                            </p>
                        </div>

                        <button
                            className={`toggle ${notifications ? "on" : ""}`}
                            onClick={() =>
                                setNotifications(!notifications)
                            }
                        >
                            <span></span>
                        </button>

                    </div>

                </div>

                <div className="settings-section danger-section">

                    <div className="settings-section-header">
                        <h2>Subscription</h2>

                        <p>
                            Manage your current plan.
                        </p>
                    </div>

                    <div className="plan-card">

                        <div>
                            <span className="plan-label">
                                CURRENT PLAN
                            </span>

                            <h3>Free Plan</h3>

                            <p>
                                1,000 AI credits per month
                            </p>
                        </div>

                        <button>
                            Upgrade to Pro
                        </button>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Settings;