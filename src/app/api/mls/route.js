// app/api/mls/route.js

export async function GET() {
  const token = process.env.SPARK_ACCESS_TOKEN; // Store your token in .env.local
  const baseUrl = "https://replication.sparkapi.com/Version/3/Reso/OData/Property";

  if (!token) {
    return new Response(
      JSON.stringify({ error: "Missing SPARK_ACCESS_TOKEN" }),
      { status: 500 }
    );
  }

  try {
    // Include media with $expand=Media
    const response = await fetch(`${baseUrl}?$top=50&$expand=Media`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store", // always fresh data
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Spark API request failed", details: data }),
        { status: response.status }
      );
    }

    // data.value contains the array of listings with Media included
    return new Response(JSON.stringify(data.value || []), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch MLS data", details: err.message }),
      { status: 500 }
    );
  }
}
