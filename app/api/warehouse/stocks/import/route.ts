import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const ImportData = await request.json();

    const cookies = request.cookies;
    const myCookie = cookies.get('LoggedUser');

    // Create a FormData object
    const formData = new FormData();
    formData.append("Title", ImportData.Title);
    formData.append("Serial", ImportData.Serial);
    formData.append("Invoice", ImportData.Invoice);
    formData.append("Warehouse", ImportData.Warehouse);
    formData.append("Extra", ImportData.Extra);
    formData.append("Products", ImportData.Products);

    // Forward the data to another address
    const response = await fetch('http://192.168.1.162:8000/warehouse/stocks/import', {
        method: 'POST',
        headers: {
            'Authorization': myCookie?.value || "No Cookie"
        },
        body: formData
    });

    const result = await response.json();
    // console.log(formData)
    // const result = formData

    return NextResponse.json(result);
}
