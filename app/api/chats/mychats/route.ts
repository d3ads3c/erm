import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookies = request.cookies;
  const myCookie = cookies.get('LoggedUser');

  // Forward the data to another address
  const response = await fetch('http://192.168.1.162:8000/chats/my', {
    method: 'GET',
    headers: {
        'Authorization': myCookie?.value || "No Cookie"
    },
  });

  const result = await response.json();
  return NextResponse.json(result);
}
