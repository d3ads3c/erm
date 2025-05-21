import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { subject, startdate, enddate } = await request.json();

    const cookies = request.cookies;
    const myCookie = cookies.get('LoggedUser');

    // Create a FormData object
    const formData = new FormData();
    formData.append("Sdate", startdate);
    formData.append("Edate", enddate);
    formData.append("Type", subject);

    // Forward the data to another address
    const response = await fetch('http://localhost:8000/vacation/new', {
        method: 'POST',
        headers: {
            'Authorization': myCookie?.value || "No Cookie"
        },
        body: formData
    });

    const result = await response.json();

    return NextResponse.json(result);
}
