import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const Today = await fetch("http://192.168.1.162:8000/today").then((response) =>
    response.json()
  );
  return NextResponse.json(Today);
}