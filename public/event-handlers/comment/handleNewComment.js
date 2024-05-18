const handleNewComment = async (event) => {
  event.preventDefault();

  // Retrieve the logged_in value from the HTML element and check if it is equal to the string "true".
  // This comparison will set userLoggedIn to true (boolean) if the value is "true", otherwise false (boolean).
  const userLoggedIn =
    document.getElementById("logged-in").getAttribute("data-logged-in") ===
    "true";

  // If user not logged in, redirect to login
  if (!userLoggedIn) {
    document.location.replace("/login");
    return;
  }

  try {
    // Retrieve comment from input text area
    const commentData = document.querySelector("#comment").value.trim();

    // Retrieve post_id attribute, stored in post container
    const postData = document
      .getElementById("post")
      .getAttribute("data-post-id");

    if (commentData && postData) {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: commentData, post_id: postData }),
      });

      if (response.ok) {
        document.location.reload();
      } else {
        const errorData = await response.json();
        console.error("Error Adding Comment:", errorData);
      }
    }
  } catch (err) {
    console.error("Error Adding Comment:", err);
  }
};

document
  .querySelector("#comment-form")
  .addEventListener("submit", handleNewComment);
