"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function HrListPage() {
  const router = useRouter();
  const [hrList, setHrList] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("/api/hr");
        if (response.data.success) {
            console.log(response);
          setHrList(response.data.data);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchCompanies();
  }, []);

  const handleAddHrAcount = () => {
    router.push("/add-hr");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col items-center">
      <div className="w-full max-w-6xl p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black">Hr List</h1>
          <button
            onClick={handleAddHrAcount}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Create HR Account
          </button>
        </div>
        <div className="flex flex-col gap-6">
          {hrList.map((hr) => (
            <div
              key={hr._id}
              className="p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-black">{hr.name}</h2>
              <p className="text-gray-700 mt-2">Email: {hr.email}</p>
              <p className="text-gray-700">Phone: {hr.phone}</p>
              <p className="text-gray-700">Company Name: {hr.company.companyname}</p>
              <p className="text-gray-700">Company Type: {hr.company.companytype}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
