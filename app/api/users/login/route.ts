import { dbConnect } from "@/lib/db";
import User from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";
import { Iuser } from "@/models/user.model";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


export async function POST(req : NextRequest) {
    try{

        await dbConnect();

        const reqBody = await req.json();
        const {email , password} = reqBody;

        const user: Iuser|null = await User.findOne({email});

        if(!user) {
            return NextResponse.json(
                {error: "User not found with this email"},
                {status: 400}
            );
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword) {
            return NextResponse.json(
                {error: "Invalid password"},
                {status: 400}
            );
        }


        const token_paylod = {
            id: user._id,
        }

        const token = jwt.sign(token_paylod, process.env.TOKEN_SECRET!, {expiresIn: '1h'})

        const response = NextResponse.json({
            message : "logged in successfully",
            success: true,
        })

        response.cookies.set('token', token, {
            httpOnly: true,
        })

        return response;

    } catch (err: unknown) {
    if (err instanceof Error) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    } else {
        return NextResponse.json({ error: "An unknown error occurred." }, { status: 500 });
    }
}

}
