const API_URL = "https://simple-scholarship-tracker.onrender.com";

// Login handler
const handleLogin = async (email, password) => {
  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");

    console.log("Logged in successfully:", data);
  } catch (err) {
    alert(err.message);
  }
};