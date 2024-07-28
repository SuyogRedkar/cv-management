"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function ProfilePage() {
  const router = useRouter();
  const [decodedToken, setDecodedToken] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
      } catch (error) {
        console.error("Invalid token:", error);
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Profile Page</h1>
        {token ? (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-bold">Decoded Token</h2>
            <pre className="mt-2 text-sm">{JSON.stringify(token, null, 2)}</pre>
          </div>
        ) : (
          <p>No token found or invalid token.</p>
        )}
      </div>
    </div>
  );
}
