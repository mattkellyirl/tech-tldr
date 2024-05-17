const addComment = async (event) => {
  event.preventDefault();

  try {
    // Retrieve comment from input text area
    const comment = document.querySelector("#comment").value.trim();

    // Retrieve post_id attribute, stored in post container
    const post = document.getElementById("post").getAttribute("data-post-id");

    console.log(post);
    console.log(comment);

    if (comment && post) {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: comment, post_id: post }),
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
    return res
      .status(500)
      .json({ error: "Request Failed - Add Comment", details: err });
  }
};

document.querySelector("#comment-form").addEventListener("submit", addComment);
