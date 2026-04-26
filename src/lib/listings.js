import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function getPropertyByListingId(listingId) {
  if (!listingId) return null;

  const { data, error } = await supabaseAdmin
    .from("properties")
    .select("*")
    .eq("ListingId", listingId)
    .maybeSingle();

  if (error) {
    console.error("Supabase listing fetch error:", error);
    return null;
  }

  return data;
}
