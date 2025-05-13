import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { user } = await request.json();

    const cookies = request.cookies;
    const myCookie = cookies.get('LoggedUser');

    // Create a FormData object
    const formData = new FormData();
    formData.append("User", user);

    // Forward the data to another address
    const response = await fetch('http://192.168.1.162:8000/chats/new', {
        method: 'POST',
        headers: {
            'Authorization': myCookie?.value || "No Cookie"
        },
        body: formData
    });
    console.log(formData)
    const result = await response.json();

    return NextResponse.json(result);
}
