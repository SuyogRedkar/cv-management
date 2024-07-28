"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CompaniesPage() {
  const router = useRouter();
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("/api/company");
        if (response.data.success) {
            console.log(response);
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

  const handleAddCompany = () => {
    router.push("/add-company");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col items-center">
      <div className="w-full max-w-6xl p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black">Companies</h1>
          <button
            onClick={handleAddCompany}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add Company
          </button>
        </div>
        <div className="flex flex-col gap-6">
          {companies.map((company) => (
            <div
              key={company._id}
              className="p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-black">{company.companyname}</h2>
              <p className="text-gray-700 mt-2">Email: {company.companyemail}</p>
              <p className="text-gray-700">Address: {company.companyaddress}</p>
              <p className="text-gray-700">Type: {company.companytype}</p>
              <p className="text-gray-700">Employee Count: {company.employeecount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
