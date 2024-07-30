import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  candidatename: {
    type: String,
    required: [true, "Please provide a candidate name"],
    unique: true,
  },
  candidateemail: {
    type: String,
    required: [true, "Please provide a candidate email"],
    unique: true,
  },
  candidateaddress: {
    type: String,
    required: [true, "Please provide a candidate address"],
  },
  candidatephone: {
    type: Number,
  },
  candidateexperience: {
    type: String,
  },
  candidateresume: {
    type: String,
    required: [true, "Please provide a Resume"],
  },
  candidatequalification: {
    type: String,
  },
});

const Candidate =
  mongoose.models.Candidate || mongoose.model("Candidate", candidateSchema);

export default Candidate;
