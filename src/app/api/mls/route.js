import { LRUCache } from "lru-cache";
import { supabase } from "@/lib/supabase";






const cache = new LRUCache({ max: 50, ttl: 5 * 60 * 1000 }); // 5 min cache

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const flatten = url.searchParams.get("flatten") === "true";
    const limit = parseInt(url.searchParams.get("limit") || "1000", 10);
    const cacheKey = flatten ? `mls-flat-${limit}` : `mls-full-${limit}`;

    // Return cached response if available
    const cached = cache.get(cacheKey);
    if (cached) return new Response(JSON.stringify(cached), { status: 200 });

    // Fetch listings from Supabase
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("dateAdded", { ascending: false })
      .limit(limit);

    if (error) {
      return new Response(
        JSON.stringify({ error: "Supabase query failed", details: error.message }),
        { status: 500 }
      );
    }

    let result = data;

    // Flatten if requested
    if (flatten) {
      result = data.map((p) => ({
        id: p.id,
        price: p.price,
        type: p.type,
        beds: p.beds,
        baths: p.baths,
        sqft: p.sqft,
        acres: p.acres,
        address: p.address,
        images: p.images || ["/images/no-image.jpg"],
        dateAdded: p.dateAdded,
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
