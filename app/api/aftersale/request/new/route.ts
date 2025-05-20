import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { Subject, Fnumber, Model, Part } = await request.json();

    const cookies = request.cookies;
    const myCookie = cookies.get('LoggedUser');

    // Create a FormData object
    const formData = new FormData();
    formData.append("Subject", Subject);
    formData.append("Fnumber", Fnumber);
    formData.append("Model", Model);
    formData.append("Part", Part);

    // Forward the data to another address
    const response = await fetch('http://192.168.1.162:8000/aftersale/request/new', {
        method: 'POST',
        headers: {
            'Authorization': myCookie?.value || "No Cookie"
        },
        body: formData
    });

    const result = await response.json();

    return NextResponse.json(result);
}
