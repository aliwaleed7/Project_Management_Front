import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Toggle between Login & Signup
  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError("");
    setFormData({ username: "", email: "", password: "" });  
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const url = isSignUp
      ? "http://localhost:5000/api/users/signup"
      : "http://localhost:5000/api/users/login";

    try {
      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setFormData({ username: "", email: "", password: "" });  
        navigate("/main");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col">
          {isSignUp && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="p-2 border border-gray-300 rounded mb-3"
              value={formData.username}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-2 border border-gray-300 rounded mb-3"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-2 border border-gray-300 rounded mb-3"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span className="text-blue-500 cursor-pointer" onClick={toggleForm}>
            {isSignUp ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
