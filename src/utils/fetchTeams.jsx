import axios from "axios";

const fetchTeams = async (workspaceId, setTeams) => {
  try {
    const token =
      localStorage.getItem("token") ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQwMTYyNDgwLCJleHAiOjE3NDczNjI0ODB9.ru3_l-CpVUK7x-AT9xtS57Z7tNASk_prluz0RZSh6aQ";

    const response = await axios.get(
      `http://localhost:5000/api/teams/workspace/${workspaceId}/teams`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTeams(response.data.data);
  } catch (error) {
    console.error("Error fetching teams:", error);
  }
};

export default fetchTeams;
