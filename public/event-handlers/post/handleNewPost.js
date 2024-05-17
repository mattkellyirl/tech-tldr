const handleNewPost = async (event) => {
  event.preventDefault();

  try {
    const titleData = document.querySelector("#title").value.trim();
    const contentData = document.querySelector("#content").value.trim();

    if (titleData && contentData) {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: titleData, content: contentData }),
      });

      if (response.ok) {
        document.location.replace("/");
      } else {
        const errorData = await response.json();
        console.error("Error Adding Post:", errorData);
      }
    }
  } catch (err) {
    console.error("Error Adding Post:", err);
  }
};

document.querySelector("#post-form").addEventListener("submit", handleNewPost);
