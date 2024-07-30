"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

export default function CandidatePage() {
  const router = useRouter();
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("/api/candidate");
        if (response.data.success) {
          console.log(response);
          setCandidates(response.data.data);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchCompanies();
  }, []);

  const handleAddCandidate = () => {
    router.push("/add-candidate");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col items-center">
      <div className="w-full max-w-6xl p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black">Candidates</h1>
          <button
            onClick={handleAddCandidate}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add Candidate
          </button>
        </div>
        <div className="flex flex-col gap-6">
          {candidates.map((candidate) => (
            <div
              key={candidate._id}
              className="p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-black">
                  {candidate.candidatename}
                </h2>
                <a
                  href={candidate.candidateresume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tooltip"
                >
                  <FontAwesomeIcon
                    icon={faDownload}
                    className="text-black"
                    title="Download Resume"
                  />
                </a>
              </div>

              <p className="text-gray-700 mt-2">
                Email: {candidate.candidateemail}
              </p>
              <p className="text-gray-700">
                Address: {candidate.candidateaddress}
              </p>
              <p className="text-gray-700">Phone: {candidate.candidatephone}</p>
              <p className="text-gray-700">
                Experience: {candidate.candidateexperience}
              </p>
              <p className="text-gray-700">
                Qualification: {candidate.candidatequalification}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
