import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    companyname: {
        type: String,
        required: [true, "Please provide a company name"],
        unique: true,
    },
    companyemail: {
        type: String,
        required: [true, "Please provide a company email"],
        unique: true,
    },
    companyaddress: {
        type: String,
        required: [true, "Please provide a company address"],
    },
    companytype: {
        type: String,
    },
    employeecount: {
        type: Number,
    },
});

const Company = mongoose.models.Company || mongoose.model("Company", companySchema);

export default Company;
