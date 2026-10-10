import { useState, useEffect } from "react";

function Navbar({credits,onMenuClick}) {
    const [name, setName] = useState(
        localStorage.getItem("nexaai-name") || "Siem"
    );

    useEffect(() => {
        const updateProfile = () => {
            setName(
                localStorage.getItem("nexaai-name") || "Siem"
            );
        };

        window.addEventListener("storage", updateProfile);

        return () => {
            window.removeEventListener("storage", updateProfile);
        };
    }, []);

    return (
        <nav className="navbar">
               <button
            className="mobile-menu-btn"
            onClick={onMenuClick}
            aria-label="Open navigation menu"
        >
            ☰
        </button>
            <div className="navbar-logo">
                <span>✦</span>
                <h2>NexaAI</h2>
            </div>

            <div className="navbar-right">
                <div className="credits">
                    <span>⚡</span>
                    <p>{credits} credits</p>
                </div>

                <button className="notification-btn">
                    🔔
                </button>

                <div className="profile">
                    <div className="profile-avatar">
                        {name.charAt(0).toUpperCase()}
                    </div>

                    <div className="profile-info">
                        <h4>{name}</h4>
                        <p>Free Plan</p>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;