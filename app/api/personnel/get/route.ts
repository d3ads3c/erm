import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { ID } = await request.json();

  // Create a FormData object
  const formData = new FormData();
  formData.append("UserID", ID);

  // Forward the data to another address
  const response = await fetch('http://localhost:8000/personnel/get', {
    method: 'POST',
    body: formData
  });

  const result = await response.json();
  return NextResponse.json(result);
}
