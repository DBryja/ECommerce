// TODO: Remove if unnecessary
import { NextApiRequest, NextApiResponse } from 'next'
import {db} from "@/db";
import bcrypt from 'bcrypt'
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { login, password } = req.body;
    const user = await db.employee.findUnique({
        where: {
            login
        }
    })
    if(!user) {
        res.status(401).json({error: 'Invalid credentials.'})
    }

    const match = await bcrypt.compare(password, user!.password);

    if(match) {
        res.status(200).json({ success: true });
    } else{
        res.status(401).json({error: 'Invalid credentials.'})
    }
}