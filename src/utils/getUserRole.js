const getUserRole = async (userId) => {
  const token =
    localStorage.getItem("token") ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQwMjQ2OTY5LCJleHAiOjE3NDc0NDY5Njl9.tueYS0EZQTA8bRAGIZJxgjJIlv35_7dvdXTzVGW8t6I"; // Get token from localStorage
  if (!token) {
    console.error("No token found");
    return null;
  }

  try {
    const response = await fetch(
      `http://localhost:5000/api/users/user-role/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching role: ${response.statusText}`);
    }

    const data = await response.json();
    return data.role; // Returns the role (e.g., "admin")
  } catch (error) {
    console.error("Failed to fetch user role:", error);
    return null;
  }
};

export default getUserRole;
