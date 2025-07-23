import { dbConnect } from "@/lib/db";
import User from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";
import { Iuser } from "@/models/user.model";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function POST(req : NextRequest) {
    try {
        await dbConnect();
        const user_id = await getDataFromToken(req);
        const user = await User.findById({_id : user_id}).select("-password");

        return NextResponse.json({
            message: "user found",
            data : user
        })

    } catch (error) {
        
    }
}