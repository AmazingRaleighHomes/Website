// /app/api/bridge/listings/route.js

export async function GET() {
  try {
    const response = await fetch(
      "https://api.bridgedataoutput.com/api/v2/tmls/listings?limit=20",
      {
        headers: {
          Authorization: "Bearer 596a1d62710c5091ca4bf9f44ec88985", // Your Server Token
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { error: "Bridge API request failed", details: data },
        { status: 500 }
      );
    }

    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error("Bridge Fetch Error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
