import { dbConnect } from "@/lib/db";
import User from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";
import { Iuser } from "@/models/user.model";
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/utils/mailer";
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
    try {
        const conne:any = await dbConnect();
        const reqBody = await req.json();
        const {username , email , password} = reqBody;

        const user: Iuser|null = await User.findOne({email});

        if(user) {
            return NextResponse.json(
                {error: "User already exists with this email"},
                {status: 400}
            )   
        }


    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);
    
    const newUser = new User ({
        username,email, password:hash
    })

    const savedUser : Iuser = await newUser.save();

    //send verification email
    console.log("Sending verification email to:");
    await sendEmail({email, emailtype: "verify", userId: savedUser._id!});

    console.log("User created successfully");
    return NextResponse.json(
       {message: "User created successfully, please check your email to verify your account",
        success : true
        });

    } catch(error: unknown) {
        if(error instanceof Error) {
            return NextResponse.json(
                {error: error.message || "Failed to create user"},
                {status: 500}
            );
        }
        return NextResponse.json(
            {error: "Failed to create user"},
            {status: 500}
        );
    }
 
} 