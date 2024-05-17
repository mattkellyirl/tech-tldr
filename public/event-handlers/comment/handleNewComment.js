const handleNewComment = async (event) => {
  event.preventDefault();

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
