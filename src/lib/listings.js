import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function getPropertyByListingId(listingId) {
  if (!listingId) return null;

  const candidateValues = Array.from(
    new Set(
      [listingId, Number(listingId), String(listingId)]
        .filter((value) => value !== "" && value !== null && !Number.isNaN(value))
    )
  );

  for (const candidate of candidateValues) {
    const listingIdQuery = await supabaseAdmin
      .from("properties")
      .select("*")
      .eq("ListingId", candidate)
      .maybeSingle();

    if (listingIdQuery.data) {
      return listingIdQuery.data;
    }

    const lowercaseListingIdQuery = await supabaseAdmin
      .from("properties")
      .select("*")
      .eq("listingId", candidate)
      .maybeSingle();

    if (lowercaseListingIdQuery.data) {
      return lowercaseListingIdQuery.data;
    }

    const internalIdQuery = await supabaseAdmin
      .from("properties")
      .select("*")
      .eq("id", candidate)
      .maybeSingle();

    if (internalIdQuery.data) {
      return internalIdQuery.data;
    }

    if (
      listingIdQuery.error &&
      !listingIdQuery.error.message?.includes("0 rows") &&
      !listingIdQuery.error.message?.includes("JSON object requested")
    ) {
      console.error("Supabase listing fetch error:", listingIdQuery.error);
    }
  }

  return null;
}
