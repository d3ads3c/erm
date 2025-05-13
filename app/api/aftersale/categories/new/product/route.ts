import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { brand, model,country } = await request.json();

    const cookies = request.cookies;
    const myCookie = cookies.get('LoggedUser');

    // Create a FormData object
    const formData = new FormData();
    formData.append("Brand", brand);
    formData.append("Model", model);
    formData.append("Country", country);

    // Forward the data to another address
    const response = await fetch('http://192.168.1.162:8000/aftersale/categories/new/product', {
        method: 'POST',
        headers: {
            'Authorization': myCookie?.value || "No Cookie"
        },
        body: formData
    });

    const result = await response.json();

    return NextResponse.json(result);
}
