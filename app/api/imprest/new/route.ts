import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { month, cash } = await request.json();

    const cookies = request.cookies;
    const myCookie = cookies.get('LoggedUser');

    // Create a FormData object
    const formData = new FormData();
    formData.append("Month", month);
    formData.append("Cash", cash);

    // Forward the data to another address
    const response = await fetch('http://localhost:8000/imprest/new', {
        method: 'POST',
        headers: {
            'Authorization': myCookie?.value || "No Cookie"
        },
        body: formData
    });

    const result = await response.json();

    return NextResponse.json(result);
}
