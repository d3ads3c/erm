import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const personnels = await fetch("http://localhost:8000/settings/departmans").then((response) =>
    response.json()
  );
  return NextResponse.json(personnels);
}