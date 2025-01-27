import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://riyhedddewamczlrnfen.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpeWhlZGRkZXdhbWN6bHJuZmVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0NDU2NzMsImV4cCI6MjA1MDAyMTY3M30.pPMV_2JDcZoatrO_WMW0QI9j5pTt2rg33om0cCRaOPU';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


