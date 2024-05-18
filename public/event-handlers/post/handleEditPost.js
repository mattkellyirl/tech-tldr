const handleEditPost = async (event) => {
  event.preventDefault();

  // Retrieve the post ID from the form's data attribute
  const post_id = document
    .getElementById("post-form")
    .getAttribute("data-post-id");

  try {
    const titleData = document.querySelector("#title").value.trim();
    const contentData = document.querySelector("#content").value.trim();

    if (titleData && contentData) {
      const response = await fetch(`/api/posts/${post_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: titleData, content: contentData }),
      });

      if (response.ok) {
        document.location.replace("/");
      } else {
        const errorData = await response.json();
        console.error("Error Updating Post:", errorData);
      }
    }
  } catch (err) {
    console.error("Error Updating Post:", err);
  }
};

document
  .querySelector("#save-button")
  .addEventListener("click", handleEditPost);
