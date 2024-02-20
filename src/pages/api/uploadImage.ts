// import { NextResponse } from "next/server";
// import path from "path";
// import { writeFile } from "fs/promises";
//
// export const POST = async (req : Request, res : Response) => {
//     const formData = await req.formData();
//
//     const file = formData.get("file") as File;
//     if (!file) {
//         return NextResponse.json({ error: "No files received." }, { status: 400 });
//     }
//
//     const buffer = Buffer.from(await file.arrayBuffer());
//     const filename =  file.name.replaceAll(" ", "_");
//     console.log(filename);
//     try {
//         await writeFile(
//             path.join(process.cwd(), "public/uploads/" + filename),
//             buffer
//         );
//         return NextResponse.json({ Message: "Success", status: 201 });
//     } catch (error) {
//         console.log("Error occured ", error);
//         return NextResponse.json({ Message: "Failed", status: 500 });
//     }
// };

import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { writeFile } from 'fs/promises';

type ResponseData = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const formData = await req.body.formData();

    const file = formData.get('file') as any;
    if (!file) {
        res.status(400).json({ message: 'No files received.' });
        return;
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name.replaceAll(' ', '_');
    try {
        await writeFile(
            path.join(process.cwd(), 'public/uploads/' + filename),
            buffer
        );
        res.status(201).json({ message: 'Success' });
    } catch (error) {
        console.error('Error occurred ', error);
        res.status(500).json({ message: 'Failed' });
    }
}