const newUserSignup = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();

  try {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      document.location.replace("/");

      const data = await response.json();
      console.log("New User Signed Up:", data);
    } else {
      const errorData = await response.json();
      console.error("Error Signing Up User:", errorData);
    }
  } catch (err) {
    console.error("Error Signing Up New User:", err);
    return res
      .status(500)
      .json({ error: "Request Failed - New User Signup", details: err });
  }
};

document
  .querySelector("#signup-form")
  .addEventListener("submit", newUserSignup);
