// app/api/mls/route.js
export async function GET() {
  const token = process.env.SPARK_ACCESS_TOKEN; 
  const baseUrl = "https://replication.sparkapi.com/Version/3/Reso/OData/Property";

  if (!token) {
    return new Response(
      JSON.stringify({ error: "Missing SPARK_ACCESS_TOKEN" }),
      { status: 500 }
    );
  }

  try {
    // Fetch latest 200 properties, ordered by OnMarketDate descending
    const response = await fetch(
      `${baseUrl}?$top=200&$expand=Media&$orderby=OnMarketDate desc`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Spark API request failed", details: data }),
        { status: response.status }
      );
    }

    // Log first listing keys for debugging
    if (data.value && data.value.length > 0) {
      console.log("First listing keys:", Object.keys(data.value[0]));
    }

    return new Response(JSON.stringify(data.value || []), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch MLS data", details: err.message }),
      { status: 500 }
    );
  }
}
