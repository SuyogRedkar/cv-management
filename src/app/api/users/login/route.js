import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request){
    try {

        const reqBody = await request.json()
        const {email, password} = reqBody;

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }
        
        const userData = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
       
        const token = jwt.sign(userData, process.env.TOKEN_SECRET, {expiresIn: "1m"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            token,
            userData
        })
       
        return response;

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}