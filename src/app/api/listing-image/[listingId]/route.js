import { getPropertyByListingId, getPrimaryImageUrl } from "@/lib/listings";

export async function GET(_request, { params }) {
  const { listingId } = await params;
  const property = await getPropertyByListingId(listingId);

  if (!property) {
    return new Response("Listing not found", { status: 404 });
  }

  const imageUrl = getPrimaryImageUrl(property);

  if (!imageUrl) {
    return new Response("Image not found", { status: 404 });
  }

  try {
    const upstream = await fetch(imageUrl, {
      headers: {
        "user-agent": "UlrichRealtyBot/1.0",
      },
      cache: "no-store",
    });

    if (!upstream.ok) {
      return new Response("Unable to fetch image", { status: 502 });
    }

    const contentType = upstream.headers.get("content-type") || "image/jpeg";
    const arrayBuffer = await upstream.arrayBuffer();

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        "content-type": contentType,
        "cache-control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Listing image proxy error:", error);
    return new Response("Unable to fetch image", { status: 500 });
  }
}
