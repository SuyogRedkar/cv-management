"use client";

import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faUserTie, faUsers, faBriefcase } from "@fortawesome/free-solid-svg-icons";

export default function HomePage() {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-6">
      <h1 className="text-4xl font-bold mb-8 text-black">Home Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div
          className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => handleNavigation("/companies")}
        >
          <FontAwesomeIcon icon={faBuilding} className="text-6xl mb-4 text-blue-600" />
          <h2 className="text-2xl font-semibold text-black">Companies</h2>
        </div>
        <div
          className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => handleNavigation("/hr-list")}
        >
          <FontAwesomeIcon icon={faUserTie} className="text-6xl mb-4 text-green-600" />
          <h2 className="text-2xl font-semibold text-black">HR List</h2>
        </div>
        <div
          className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => handleNavigation("/candidate-list")}
        >
          <FontAwesomeIcon icon={faUsers} className="text-6xl mb-4 text-purple-600" />
          <h2 className="text-2xl font-semibold text-black">Candidate List</h2>
        </div>
        <div
          className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => handleNavigation("/job-vacancies")}
        >
          <FontAwesomeIcon icon={faBriefcase} className="text-6xl mb-4 text-red-600" />
          <h2 className="text-2xl font-semibold text-black">Job Vacancies</h2>
        </div>
      </div>
    </div>
  );
}
