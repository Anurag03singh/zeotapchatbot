// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://mawvdiujjtliwgqrlzga.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hd3ZkaXVqanRsaXdncXJsemdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4MjgzNTAsImV4cCI6MjA1MjQwNDM1MH0.mouI-YmiW1XVeCZf3Rt8Fv0Ixkr-eKyWKVVKaw3V5ys";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);