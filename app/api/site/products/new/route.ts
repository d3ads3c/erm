import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("mainimg");

        if (file && typeof file !== "string") {
            // Read the file stream
            const buffer = await file.arrayBuffer();
            const originalFileName = file.name;
            const extension = path.extname(originalFileName);
            const uniqueFileName = `${path.basename(
                originalFileName,
                extension
            )}_${Date.now()}${extension}`;
            const filePath = path.join(
                process.cwd(),
                "/public/img/products",
                uniqueFileName
            );

            // Write the file to the server
            fs.writeFileSync(filePath, Buffer.from(buffer));
            formData.set("mainimg", uniqueFileName);
        } else {
            formData.set("mainimg", "");
        }


        const data = {
            faName: formData.get("faName"),
            enName: formData.get("enName"),
            Category: formData.get("Category"),
            flag: formData.get("flag"),
            shortDesc: formData.get("shortDesc"),
            Link: formData.get("Link"),
            mainimg: formData.get("mainimg"),
            attr: JSON.parse(formData.get("attr") as string),
        };
        console.log(data);
        // Optional: Forward the data to another server if needed
        const response = await fetch("http://192.168.1.162:8000/site/products/new", {
          method: "POST",
          body: formData,
        });

        const responseData = await response.json();
        console.log(JSON.stringify(responseData));

        return NextResponse.json({
            data: responseData,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ msg: "An error occurred" });
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};