import { useState, useEffect } from "react";

const useFetchAssignees = (projectId) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/teams/project/${projectId}/members`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Set Authorization header
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setMembers(data.members || []); // Store members from response
        } else {
          setError("Failed to fetch members.");
        }
      } catch (err) {
        setError("Error fetching members.");
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchMembers();
    }
  }, [projectId]);

  return { members, loading, error };
};

export default useFetchAssignees;
