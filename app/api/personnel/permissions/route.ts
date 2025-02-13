import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const personnels = await fetch("http://192.168.1.123:8000/personnel/permissions").then((response) =>
    response.json()
  );
  return NextResponse.json(personnels);
}