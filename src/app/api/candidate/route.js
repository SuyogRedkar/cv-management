import { connect } from "@/dbConfig/dbConfig";
import Candidate from "@/models/candidateModel";
import { NextResponse } from "next/server";
import cloudinary from "@/helpers/cloudinaryConfig";
import { Readable } from "stream";

connect();

export async function GET() {
  try {
    const candidates = await Candidate.find();
    return NextResponse.json({
      success: true,
      data: candidates,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const reqBody = await req.formData();

    const candidatename = reqBody.get('candidatename');
    const candidateemail = reqBody.get('candidateemail');
    const candidateaddress = reqBody.get('candidateaddress');
    const candidatephone = reqBody.get('candidatephone');
    const candidateexperience = reqBody.get('candidateexperience');
    const candidatequalification = reqBody.get('candidatequalification');
    const file = reqBody.get('File');

    if (!file) {
      return NextResponse.json({ error: "Please provide a resume file" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto", use_filename: true, folder: "resumes" }, 
        async (error, result) => {
          if (error) {
            reject(error);
          } else {
            
            const newCandidate = new Candidate({
              candidatename,
              candidateemail,
              candidateaddress,
              candidatephone,
              candidateexperience,
              candidateresume: result.secure_url,
              candidatequalification,
            });

            await newCandidate.save();

            resolve(result);
          }
        }
      );

      const readableStream = new Readable();
      readableStream._read = () => {}; 
      readableStream.push(buffer);
      readableStream.push(null);
      readableStream.pipe(uploadStream);
    });

    const uploadResult = await uploadPromise;

    return NextResponse.json({
      success: true,
      message: "Candidate added successfully",
      resumeUrl: uploadResult.secure_url,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
