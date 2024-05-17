const handleLogoutUser = async (event) => {
  event.preventDefault();

  try {
    const response = await fetch("/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");

      const data = await response.json();
      console.log("User Logged Out:", data);
    } else {
      const errorData = await response.json();
      console.error("Error Logging Out User:", errorData);
    }
  } catch (err) {
    console.error("Error Logging Out User:", err);
  }
};

document
  .querySelector("#logout-button")
  .addEventListener("click", handleLogoutUser);
