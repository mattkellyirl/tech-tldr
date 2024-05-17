const handleLoginUser = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();

  try {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      document.location.replace("/");

      const data = await response.json();
      console.log("User Logged In:", data);
    } else {
      const errorData = await response.json();
      console.error("Error Logging In User:", errorData);
    }
  } catch (err) {
    console.error("Error Logging In User:", err);
  }
};

document
  .querySelector("#login-form")
  .addEventListener("submit", handleLoginUser);
