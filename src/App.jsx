import { useState, useEffect } from "react";
import Navbar from "./components/navbar.jsx";
import Sidebar from "./components/sidebar.jsx";
import Dashboard from "./components/dashboard.jsx";
import Generator from "./components/generator.jsx";
import Chat from "./components/chat.jsx";
import History from "./components/history.jsx";
import Usage from "./components/usage.jsx";
import Settings from "./components/settings.jsx";
import "./App.css";

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState("dashboard");
   const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("nexaai-history");

    return savedHistory
        ? JSON.parse(savedHistory)
        : [];
});
useEffect(() => {
    localStorage.setItem(
        "nexaai-history",
        JSON.stringify(history)
    );
}, [history]);

   const [credits, setCredits] = useState(() => {
    const savedCredits = localStorage.getItem("nexaai-credits");
 
    return savedCredits
        ? Number(savedCredits)
        : 850;
});

const [generations, setGenerations] = useState(() => {
    const savedGenerations =
        localStorage.getItem("nexaai-generations");

    return savedGenerations
        ? Number(savedGenerations)
        : 124;
});
useEffect(() => {
    localStorage.setItem(
        "nexaai-credits",
        credits
    );
}, [credits]);

useEffect(() => {
    localStorage.setItem(
        "nexaai-generations",
        generations
    );
}, [generations]);
    const renderPage = () => {
        if (currentPage === "dashboard") {
           return (
        <Dashboard
            setCurrentPage={setCurrentPage}
            credits={credits}
            generations={generations}
        />
    );
        }

        if (currentPage === "generator") {
            return (
        <Generator
            setHistory={setHistory}
    credits={credits}
    setCredits={setCredits}
    setGenerations={setGenerations}
        />
    );
        }

        if (currentPage === "chat") {
            return <Chat 
               setHistory={setHistory}
            />;
        }

        if (currentPage === "history") {
             return (
        <History
            history={history}
        />
    );
        }

        if (currentPage === "usage") {
            return <Usage
             credits={credits}
    generations={generations}
            />;
        }

        if (currentPage === "settings") {
            return <Settings />;
        }

        return <Dashboard setCurrentPage={setCurrentPage} />;
    };

    return (
        <div className="app">
            <Navbar 
            credits={credits}
             onMenuClick={() => setIsSidebarOpen(true)}/>

            <div className="app-body">
                <Sidebar
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                     isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />

                <main className="main-content">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
}

export default App;