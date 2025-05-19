const copyIcon = document.getElementById("copy-link");
const inputField = document.getElementById("input-field");

window.addEventListener("DOMContentLoaded", () => {
  inputField.value = window.location.href;
});

// Validation entered URL
function isValidURL(string) {
  try {
    if (string.startsWith("www.")) {
      string = "https://" + string;
    }

    const url = new URL(string);
    return url.hostname.includes(".");
  } catch (_) {
    return false;
  }
}

function normalizeURL(string) {
  if (string.startsWith("www.")) {
    return "https://" + string;
  }
  return string;
}

// Copying page link to the clipboard
function copyLink() {
  let link = inputField.value.trim();

  if (!link) {
    alert("Input field is empty!");
    return;
  }

  if (!isValidURL(link)) {
    alert(
      "Please enter a valid URL starting with http://, https://, or www."
    );
    return;
  }

  link = normalizeURL(link);

  navigator.clipboard
    .writeText(link)
    .then(() => {
      alert(`Copied: ${link}`);
      inputField.value = "";
    })
    .catch((err) => {
      console.error("Failed to copy:", err);
    });
}

copyIcon.addEventListener("click", copyLink);