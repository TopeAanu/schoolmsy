// hooks/useStudentAuth.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const useStudentAuth = () => {
  const router = useRouter();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const authData = localStorage.getItem("studentAuth");
    if (!authData) {
      router.push("/student/login");
      return;
    }

    const { token, username } = JSON.parse(authData);

    const fetchStudentData = async () => {
      try {
        // Fetch profile
        const profileResponse = await fetch(
          `/api/student/profile?username=${encodeURIComponent(username)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Fetch assignments
        const assignmentsResponse = await fetch(
          `/api/student/assignments?username=${encodeURIComponent(username)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!profileResponse.ok || !assignmentsResponse.ok) {
          if (
            profileResponse.status === 401 ||
            assignmentsResponse.status === 401
          ) {
            localStorage.removeItem("studentAuth");
            router.push("/student/login");
            return;
          }
          throw new Error("Failed to fetch student data");
        }

        const profileData = await profileResponse.json();
        const assignmentsData = await assignmentsResponse.json();

        setStudentData({
          ...profileData,
          assignments: assignmentsData,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [router]);

  return { studentData, loading, error };
};