"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function AddHrAcountPage() {
  const router = useRouter();
  const [companies, setCompanies] = useState([]);
  const [hr, setHr] = useState({
    name: "",
    email: "",
    phone: "",
    companyId: "",
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("/api/company");
        if (response.data.success) {
          setCompanies(response.data.data);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHr({ ...hr, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/hr", hr);
      if (response.data.success) {
        toast.success("HR account created successfully");
        router.push("/hr-list");
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
        <h1 className="text-3xl font-bold text-black text-center mb-6">
          Create HR Account
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col text-black">
            Name
            <input
              type="text"
              name="name"
              value={hr.name}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-lg"
            />
          </label>
          <label className="flex flex-col text-black">
            Email
            <input
              type="email"
              name="email"
              value={hr.email}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-lg"
            />
          </label>
          <label className="flex flex-col text-black">
            Phone
            <input
              type="tel"
              name="phone"
              value={hr.phone}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg"
            />
          </label>
          <label className="flex flex-col text-black">
            Company
            <select
              name="companyId"
              value={hr.companyId}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="" disabled>
                Select a company
              </option>
              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.companyname}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
