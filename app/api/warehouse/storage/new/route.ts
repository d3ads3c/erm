import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { name, manager } = await request.json();

    const cookies = request.cookies;
    const myCookie = cookies.get('LoggedUser');

    // Create a FormData object
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Manager", manager);

    // Forward the data to another address
    const response = await fetch('http://localhost:8000/warehouse/storage/new', {
        method: 'POST',
        headers: {
            'Authorization': myCookie?.value || "No Cookie"
        },
        body: formData
    });

    const result = await response.json();

    return NextResponse.json(result);
}
