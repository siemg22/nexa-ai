function Usage({ credits, generations }) {
    return (
        <section className="usage-page">

            <div className="page-header">
                <div>
                    <p className="page-label">ACCOUNT</p>

                    <h1>Usage & Credits</h1>

                    <p>
                        Track your AI usage and remaining credits.
                    </p>
                </div>
            </div>

            <div className="usage-summary">

                <div className="usage-card">

                    <div className="usage-card-top">
                        <span>⚡</span>
                        <p>Credits Remaining</p>
                    </div>

                    <h2>{credits}</h2>

                    <div className="progress-bar">
                        <div
                        className="progress-fill"
                        style={{
                            width: `${(credits / 1000) * 100}%`
                        }}
                    ></div>
                    </div>
                   <p className="usage-small">
                    {credits} of 1,000 credits remaining
                </p>
                   

                </div>

                <div className="usage-card">

                    <div className="usage-card-top">
                        <span>✨</span>
                        <p>Total Generations</p>
                    </div>

                    <h2>{generations}</h2>

                    <p className="usage-small">
                        38 generations this month
                    </p>

                </div>

                <div className="usage-card">

                    <div className="usage-card-top">
                        <span>💬</span>
                        <p>AI Messages</p>
                    </div>

                    <h2>286</h2>

                    <p className="usage-small">
                        Across 24 conversations
                    </p>

                </div>

            </div>

            <div className="usage-details">

                <div className="usage-details-header">
                    <div>
                        <h2>Usage Breakdown</h2>
                        <p>
                            Your AI activity this month.
                        </p>
                    </div>
                </div>

                <div className="usage-row">
                    <div>
                        <span>✍️</span>
                        <p>AI Writer</p>
                    </div>

                    <strong>42 generations</strong>
                </div>

                <div className="usage-row">
                    <div>
                        <span>📝</span>
                        <p>AI Rewriter</p>
                    </div>

                    <strong>31 generations</strong>
                </div>

                <div className="usage-row">
                    <div>
                        <span>📄</span>
                        <p>Summarizer</p>
                    </div>

                    <strong>19 generations</strong>
                </div>

                <div className="usage-row">
                    <div>
                        <span>💡</span>
                        <p>Idea Generator</p>
                    </div>

                    <strong>32 generations</strong>
                </div>

            </div>

        </section>
    );
}

export default Usage;