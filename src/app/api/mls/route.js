// app/api/mls/route.js
import { LRUCache } from "lru-cache";

const cache = new LRUCache({ max: 20, ttl: 60 * 1000 }); // cache 20 pages for 1 minute

export async function GET(req) {
  const token = process.env.SPARK_ACCESS_TOKEN;
  const baseUrl = "https://replication.sparkapi.com/Version/3/Reso/OData/Property";

  if (!token) {
    return new Response(
      JSON.stringify({ error: "Missing SPARK_ACCESS_TOKEN" }),
      { status: 500 }
    );
  }

  try {
    const url = new URL(req.url);
    const flatten = url.searchParams.get("flatten") === "true";

    const cacheKey = flatten ? "mls-flat" : "mls-full";
    const cached = cache.get(cacheKey);
    if (cached) return new Response(JSON.stringify(cached), { status: 200 });

    // Full data for your landing page (safe default)
    const query = `${baseUrl}?$top=200&$expand=Media&$orderby=OnMarketDate desc`;

    const response = await fetch(query, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Spark API request failed", details: data }),
        { status: response.status }
      );
    }

    let result = data.value || [];

    if (flatten) {
      result = result.map((p) => ({
        id: p.Id,
        price: p.ListPrice || 0,
        type: p.PropertySubType || p.PropertyType || "Home",
        beds: p.BedroomsTotal || 0,
        baths: (p.BathroomsFull || 0) + (p.BathroomsHalf || 0),
        sqft: p.LivingArea || 0,
        acres: p.LotSizeAcres || 0,
        address: p.UnparsedAddress || "N/A",
        images: p.Media?.map((m) => m.MediaURL) || ["/images/no-image.jpg"],
        dateAdded: p.OnMarketDate || null,
      }));
    }

    cache.set(cacheKey, result);
    return new Response(JSON.stringify(result), { status: 200 });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch MLS data", details: err.message }),
      { status: 500 }
    );
  }
}
