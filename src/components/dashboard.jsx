import { useState, useEffect } from "react";
import ToolCard from "./toolcard.jsx";
import tools from "../data/tools.js";

function Dashboard({ setCurrentPage,
    credits,
    generations }) {
        const [name, setName] = useState(
    localStorage.getItem("nexaai-name") || "Siem"
);

useEffect(() => {
    const updateName = () => {
        setName(localStorage.getItem("nexaai-name") || "Siem");
    };

    window.addEventListener("storage", updateName);

    return () => {
        window.removeEventListener("storage", updateName);
    };
}, []);
    return (
        <section className="dashboard">

            <div className="dashboard-header">
                <div>
                    <p className="welcome-text">WELCOME BACK</p>

                    <h1>
                        Good afternoon, {name} 👋
                    </h1>

                    <p>
                        What would you like to create today?
                    </p>
                </div>

                <button
                    className="create-btn"
                    onClick={() => setCurrentPage("generator")}
                >
                    + Create with AI
                </button>
            </div>

            <div className="stats">

                <div className="stat-card">
                    <span>⚡</span>

                    <div>
                        <p>Credits Remaining</p>
                        <h2>{credits}</h2>
                    </div>
                </div>

                <div className="stat-card">
                    <span>✨</span>

                    <div>
                        <p>Generations</p>
                        <h2>{generations}</h2>
                    </div>
                </div>

                <div className="stat-card">
                    <span>🕘</span>

                    <div>
                        <p>This Month</p>
                        <h2>38</h2>
                    </div>
                </div>

            </div>

            <div className="dashboard-section">

                <div className="section-header">
                    <div>
                        <h2>AI Tools</h2>
                        <p>
                            Choose a tool to start creating.
                        </p>
                    </div>
                </div>
                 <div className="tools-grid">

    {tools.map((tool) => (
        <ToolCard
    key={tool.id}
    icon={tool.icon}
    title={tool.title}
    description={tool.description}
    credits={tool.credits}
    action={() =>
        setCurrentPage(
            tool.type === "chat"
                ? "chat"
                : "generator"
        )
    }
/>
    ))}

</div>
               

            </div>

        </section>
    );
}

export default Dashboard;