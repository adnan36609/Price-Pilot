import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(request) {
    const {searchParams}= new URL(request.url);
    const code= searchParams.get("code");

    if (code){
        const supabase= await createClient();
        await supabase.auth.exchangeCodeForSession(code);
    }

    return NextResponse.redirect(new URL("/", request.url));
}

// curl -X POST "http://localhost:3000/api/cron/check-prices" -H "Authorization: Bearer dbc0bbe8d1b0b17a97353dbbec5b84de30746269050834a082ce893d597af2a0"