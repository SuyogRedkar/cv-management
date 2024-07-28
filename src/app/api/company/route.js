import { connect } from "@/dbConfig/dbConfig";
import Company from "@/models/companyModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request) {
  try {
    const companies = await Company.find();
    return NextResponse.json({
      success: true,
      data: companies,
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
    const { companyname, companyemail, companyaddress, companytype, employeecount } = reqBody;

    const newCompany = new Company({
      companyname,
      companyemail,
      companyaddress,
      companytype,
      employeecount,
    });

    await newCompany.save();

    return NextResponse.json({
      success: true,
      message: "Company added successfully",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
