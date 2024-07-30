import mongoose from "mongoose";

const hrSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    phone: {
        type: Number,
        unique: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },
});

const HR = mongoose.models.HR || mongoose.model("HR", hrSchema);

export default HR;
