import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const {
        customer, device, info
    } = await request.json();

    const cookies = request.cookies;
    const myCookie = cookies.get('LoggedUser');

    // Create a FormData object
    const formData = new FormData();
    formData.append("name", customer.name);
    formData.append("phone", customer.phone);
    formData.append("nationalId", customer.nationalId);
    formData.append("visitDate", customer.visitDate);
    formData.append("address", customer.address);
    formData.append("customerNotes", customer.customerNotes);
    formData.append("brand", device.brand);
    formData.append("model", device.model);
    formData.append("imei1", device.imei1);
    formData.append("imei2", device.imei2);
    formData.append("damageConditions", JSON.stringify(device.damageConditions)); // Send damageConditions as a JSON string
    formData.append("damageDescription", device.damageDescription);
    formData.append("deviceNotes", device.deviceNotes);
    formData.append("technicianNotes", info.technicianNotes);

    // Forward the data to another address
    const response = await fetch('http://192.168.1.139:8000/aftersale/acceptance/new', {
        method: 'POST',
        headers: {
            'Authorization': myCookie?.value || "No Cookie"
        },
        body: formData
    });
    const result = await response.json();

    return NextResponse.json(result);
}
