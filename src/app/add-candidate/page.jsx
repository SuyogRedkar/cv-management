"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function AddCandidatePage() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState([]);
  const [candidate, setCandidate] = useState({
    candidatename: "",
    candidateemail: "",
    candidateaddress: "",
    candidatephone: "",
    candidateexperience: "",
    candidatequalification: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidate((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
   setSelectedFile(e.target.files[0])
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("File", selectedFile);

    Object.entries(candidate).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await axios.post("/api/candidate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Candidate added successfully");
        router.push("/candidate-list");
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
          Add Candidate
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col text-black">
            Name
            <input
              type="text"
              name="candidatename"
              value={candidate.candidatename}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-lg"
            />
          </label>
          <label className="flex flex-col text-black">
            Email
            <input
              type="email"
              name="candidateemail"
              value={candidate.candidateemail}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-lg"
            />
          </label>
          <label className="flex flex-col text-black">
            Address
            <input
              type="text"
              name="candidateaddress"
              value={candidate.candidateaddress}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-lg"
            />
          </label>
          <label className="flex flex-col text-black">
            Phone
            <input
              type="tel"
              name="candidatephone"
              value={candidate.candidatephone}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg"
            />
          </label>
          <label className="flex flex-col text-black">
            Experience
            <input
              type="text"
              name="candidateexperience"
              value={candidate.candidateexperience}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg"
            />
          </label>
          <label className="flex flex-col text-black">
            Qualification
            <input
              type="text"
              name="candidatequalification"
              value={candidate.candidatequalification}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg"
            />
          </label>
          <label className="flex flex-col text-black">
            Upload Resume (PDF)
            <input
              type="file"
              accept=".pdf"
              id="candidateresume"
              onChange={handleFileChange}
              required
              className="p-2 border border-gray-300 rounded-lg"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add Candidate
          </button>
        </form>
      </div>
    </div>
  );
}
