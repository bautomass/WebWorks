import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://naoqtpswnddzujxkusam.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hb3F0cHN3bmRkenVqeGt1c2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk3MDMyNjYsImV4cCI6MjA0NTI3OTI2Nn0.nU2VXN5zCld9Ng-zIWpzFtG5ICKdkHqH5d-wqqMJhn8";

export const supabase = createClient(supabaseUrl, supabaseKey);
