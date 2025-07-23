import { NextRequest } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';

export const getDataFromToken = (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value || "";
        const decodedToken= jwt.verify(token, process.env.TOKEN_SECRET!);

        if(typeof decodedToken === 'object' && 'id' in decodedToken) return decodedToken.id;
        
    } catch (error:any) {
        throw new Error(error.message);
    }
}