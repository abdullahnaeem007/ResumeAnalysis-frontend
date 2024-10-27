import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient('https://qebqwuufilzfngbvlqte.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlYnF3dXVmaWx6Zm5nYnZscXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAyMTg1MjQsImV4cCI6MjAxNTc5NDUyNH0.mfFn2gHxY6rwVLYH4sQksY6uG_l5Bbh3cPfDXJVV-XA')

export default supabase