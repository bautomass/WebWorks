import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rrovjipaxdfahnvuvfuz.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseKey) {
  throw new Error(
    "Missing Supabase anon key. Please check your .env.local file."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
