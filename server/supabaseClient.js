const { createClient } = require('@supabase/supabase-js');


const supabaseUrl = 'https://zmaquiahofbsybkgehfy.supabase.co';  // replace with your real URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptYXF1aWFob2Zic3lia2dlaGZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0OTY5OTEsImV4cCI6MjA2MzA3Mjk5MX0.VyKoBiXrwy0uFXtGhMMOVAkxeo6Z62QJTTJpduJ2HN0';                     // replace with your real key

const supabase = createClient(supabaseUrl, supabaseKey);
module.exports = supabase;

module.exports = supabase;
