function ToolCard({
    icon,
    title,
    description,
    credits,
    action
}) {
    return (
        <div
            className="tool-card"
            onClick={action}
        >

            <div className="tool-card-top">

                <div className="tool-icon">
                    {icon}
                </div>

                <span className="tool-credits">
                    {credits} credits
                </span>

            </div>

            <h3>
                {title}
            </h3>

            <p>
                {description}
            </p>

            <span className="tool-action">
                Try now →
            </span>

        </div>
    );
}

export default ToolCard;