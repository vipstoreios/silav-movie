import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  'https://zkwuxtjbagboixoguadj.supabase.co';

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  'sb_publishable__FjQsm9L7ZJ6U4MeWaG0iw_UVN5bGxW';

export const supabase = createClient(supabaseUrl, supabaseKey);
