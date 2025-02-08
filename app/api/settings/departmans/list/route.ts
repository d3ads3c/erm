import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const personnels = await fetch("http://192.168.1.123:8001/settings/departmans").then((response) =>
    response.json()
  );
  return NextResponse.json(personnels);
}