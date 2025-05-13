import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const personnels = await fetch("http://192.168.1.162:8000/settings/departmans").then((response) =>
    response.json()
  );
  return NextResponse.json(personnels);
}