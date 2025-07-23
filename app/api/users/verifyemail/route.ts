import { dbConnect } from "@/lib/db";
import User from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";
import { Iuser } from "@/models/user.model";
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/utils/mailer";


export async function POST(req : NextRequest) {
    try{

        await dbConnect();

        const reqBody = await req.json();
        const {token} = reqBody;
        console.log(token);

        const user : Iuser|null = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});

        if(!user) {
            return NextResponse.json({error: "Invalid token details"}, {status : 500});
        }

        user.isVerified = true;
        user.verifyToken = "";
        user.verifyTokenExpiry = new Date(0); 

        await user.save();  

        return NextResponse.json(
            {message: "Email verified successfully, you can now login"},
            {status: 200}
        );

    }catch(err : any) {
        return NextResponse.json({error: err.message}, {status : 500});
    }
}