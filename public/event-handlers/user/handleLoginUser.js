const handleLoginUser = async (event) => {
  event.preventDefault();

  const usernameData = document.querySelector("#username").value.trim();
  const passwordData = document.querySelector("#password").value.trim();

  try {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: usernameData, password: passwordData }),
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
