"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function AddCompanyPage() {
  const router = useRouter();
  const [company, setCompany] = useState({
    companyname: "",
    companyemail: "",
    companyaddress: "",
    companytype: "",
    employeecount: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/company", company);
      if (response.data.success) {
        toast.success("Company added successfully");
        router.push("/companies");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col items-center">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-black text-center mb-6">Add Company</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col text-black">
            Company Name
            <input
              type="text"
              name="companyname"
              value={company.companyname}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-lg"
            />
          </label>
          <label className="flex flex-col text-black">
            Company Email
            <input
              type="email"
              name="companyemail"
              value={company.companyemail}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-lg"
            />
          </label>
          <label className="flex flex-col text-black">
            Company Address
            <input
              type="text"
              name="companyaddress"
              value={company.companyaddress}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-lg"
            />
          </label>
          <label className="flex flex-col text-black">
            Company Type
            <input
              type="text"
              name="companytype"
              value={company.companytype}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg"
            />
          </label>
          <label className="flex flex-col text-black">
            Employee Count
            <input
              type="number"
              name="employeecount"
              value={company.employeecount}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add Company
          </button>
        </form>
      </div>
    </div>
  );
}
