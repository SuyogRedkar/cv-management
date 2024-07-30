import { connect } from "@/dbConfig/dbConfig";
import HR from "@/models/hrModel";
import Company from "@/models/companyModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request) {
    try {
        const hrList = await HR.find().populate('company');
        return NextResponse.json({
            success: true,
            data: hrList,
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message,
        }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { name, email, companyId, phone } = reqBody;

        const company = await Company.findById(companyId);
        if (!company) {
            return NextResponse.json({
                success: false,
                message: "Company not found",
            }, { status: 400 });
        }

        const newHR = new HR({
            name,
            email,
            company: companyId,
            phone
        });

        await newHR.save();

        return NextResponse.json({
            success: true,
            message: "HR added successfully",
            data: newHR,
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message,
        }, { status: 500 });
    }
}