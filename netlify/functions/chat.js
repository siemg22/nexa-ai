
export default async (req) => {
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "AI service is not configured." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const body = await req.json();

    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Please provide valid messages." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const messages = body.messages
      .filter(
        (item) =>
          item &&
          ["system", "user", "assistant"].includes(item.role) &&
          typeof item.content === "string" &&
          item.content.trim().length > 0
      )
      .map((item) => ({
        role: item.role,
        content: item.content.trim(),
      }));

    if (messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "No valid messages were provided." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "openrouter/free",
          messages,
        }),
      }
    );

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Netlify AI function error:", error);

    return new Response(
      JSON.stringify({ error: "Unable to connect to the AI service." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
