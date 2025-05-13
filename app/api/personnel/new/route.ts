import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { data } = await request.json();

  // Parse the data string back to an object
  const parsedData = JSON.parse(data);

  // Create a FormData object
  const formData = new FormData();
  formData.append("permissions", parsedData.Permissions);
  formData.append("manager", parsedData.Manager);
  formData.append("bDay", parsedData.BDay);
  
  // Append each field of newPersonnel separately
  formData.append("Fname", parsedData.Fname);
  formData.append("Lname", parsedData.Lname);
  formData.append("Mobile", parsedData.Phone);
  formData.append("Title", parsedData.Title);
  formData.append("BDay", parsedData.BDay);
  formData.append("Permissions", parsedData.Permissions);
  formData.append("Manager", parsedData.Manager);

  // Forward the data to another address
  const response = await fetch('http://192.168.1.162:8000/personnel/new', {
    method: 'POST',
    body: formData
  });

  const result = await response.json();

  return NextResponse.json(result);
}
