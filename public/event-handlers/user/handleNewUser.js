const handleNewUser = async (event) => {
  event.preventDefault();

  const usernameData = document.querySelector("#username").value.trim();
  const passwordData = document.querySelector("#password").value.trim();

  try {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: usernameData, password: passwordData }),
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
  }
};

document
  .querySelector("#signup-form")
  .addEventListener("submit", handleNewUser);
