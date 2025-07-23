import { dbConnect } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";



export async function GET(req : NextRequest) {
    try{
        await dbConnect();

        const response = NextResponse.json(
            {message : "logut successfully",
             success: "true"
            }
        )

        response.cookies.set("token", "", {httpOnly: true, expires: new Date(0)});  
        return response;
    
    }catch(Err : any) {
        return NextResponse.json({error: Err.message}, {status : 500});
    }
}

