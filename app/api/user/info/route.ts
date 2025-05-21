import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookies = request.cookies;
  const myCookie = cookies.get('LoggedUser');

  // Forward the data to another address
  const response = await fetch('http://localhost:8000/user/info', {
    method: 'GET',
    headers: {
        'Authorization': myCookie?.value || "No Cookie"
    },
  });

  const result = await response.json();
  return NextResponse.json(result);
}
