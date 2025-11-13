// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

// ⚠️ 실제 서비스할 때는 .env로 빼고, 지금은 테스트 겸 구조 확인용으로만 사용
const SUPABASE_URL = "https://shsydpxjchnccgnrtcfs.supabase.co"; // 예: https://abcd1234.supabase.co
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoc3lkcHhqY2huY2NnbnJ0Y2ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NTAzMDgsImV4cCI6MjA3ODUyNjMwOH0.KzZlSIi-6CIUMYgzs-JxNgMy4WTRSNa6tmjVmfxUNT4";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
