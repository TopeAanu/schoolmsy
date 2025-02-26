// hooks/useStudentAuth.js
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
        const response = await fetch(
          `/api/student/profile?username=${encodeURIComponent(username)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("studentAuth");
            router.push("/student/login");
            return;
          }
          throw new Error("Failed to fetch student data");
        }

        const data = await response.json();
        setStudentData(data);
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
