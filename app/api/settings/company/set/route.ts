import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Read the stream body and convert it to a JSON object
    const body = await req.json();
    const formData = new FormData();
    formData.append("Name", body.Name);
    formData.append("MeliID", body.MeliID);
    formData.append("FinacialCode", body.FinacialCode);
    formData.append("RegCode", body.RegCode);
    formData.append("RegDate", body.RegDate);
    formData.append("PostalCode", body.PostalCode);
    formData.append("Address", body.Address);
    const response = await fetch("http://192.168.1.162:8000/settings/company/set", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ msg: "An error occurred" });
  }
}
