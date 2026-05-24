import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://oarzwsdbaexuehsztoxu.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_qOIQSms5QY6paRnPwdyglA_7y8S1s0G";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
