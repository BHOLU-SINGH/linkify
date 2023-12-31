// Get all variables
let container = document.querySelector(".container"),
  original_link = document.querySelector("#original_link"),
  generate = document.querySelector("#generate"),
  shorten_link = document.querySelector("#shorten_link"),
  copy = document.querySelector("#copy"),
  message = document.querySelector(".message"),
  readMore = document.querySelector(".read-more"),
  shorten_link_div = document.querySelector(".shorten_link_div"),
  buttons = document.querySelectorAll(".btn-div button"),
  footer = document.querySelector("footer p span"),
  contactUs = document.querySelector(".contact-us"),
  returnBtn = document.querySelector(".return");

message.classList.remove("error", "success", "warning", "flex");

original_link.addEventListener("focus", () => {
  //   message.classList.remove("error", "success", "warning", "flex");
  message.classList.add("none");
  message.value = "";
  original_link.value = "";
  shorten_link.value = "";
  shorten_link_div.style.display = "none";
});

// handleClasses call when we want to show some message to user
const handleClasses = (className, msg) => {
  message.classList.remove("none");
  message.classList.add("flex", `${className}`);
  message.innerHTML = `${msg}`;

  // setTimeout() function set default message after 5 sec
  setTimeout(() => {
    message.classList.remove("error", "success", "warning");
    message.classList.add("error");
    message.innerHTML =
      "Shorten your links quickly and easily with FreeProjects1. Our link shortener is free to use.";
  }, 5000);
};


contactUs.addEventListener("click", () => {
  container.classList.remove("hide-box");
  container.classList.add("hide-all");
  container.classList.remove("hide-contact-us");
});
returnBtn.addEventListener("click", () => {
  container.classList.add("hide-box");
  container.classList.remove("hide-all");
  container.classList.add("hide-contact-us");
});

// If user enter the link then short this link via calling a third party api
generate.addEventListener("click", () => {
  if (original_link.value.length > 0) {
    let url = original_link.value;
    shorten_link_div.style.display = "flex";

    //calling api
    const api = new URL("https://t.ly/api/v1/link/shorten");
    const headers = {
      Authorization:
        "Bearer EhA1r50Ndd0uMDSjeR5x6NYbpZUcPMKWAYMQW4c8F43voHUlaAk2fWX57qlT",
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    let long_url = url;
    let data;

    fetch(api, {
      method: "POST",
      headers,
      body: JSON.stringify({ long_url }),
    }).then(async (response) => {
      data = await response.json();
      shorten_link.value = data.short_url;
    })
    .catch((error) => {
      // catch all error that occur in calling api
      // console.log("Error is : "+error);
        handleClasses("flex", "Something went wrong, Try again!");
        shorten_link_div.style.display = "none";
    })
  } else {
    handleClasses("warning", "Please enter url!");
    shorten_link_div.style.display = "none";
  }
});

// Enabling copy button functionality
copy.addEventListener("click", () => {
  if (shorten_link.value.length > 0) {
    navigator.clipboard.writeText(shorten_link.value);
    handleClasses("success", "Link successfully copied!");
    copy.innerHTML = "Copied!";

    setTimeout(() => {
      copy.innerHTML = "copy";
    }, 1000);
  } else {
    handleClasses("warning", "Please first generate link!");
  }
});

// Hide link shortener page and show details page
readMore.addEventListener("click", () => {
  container.classList.add("hide-box");
});

// Hide details page and show Link Shortener page
buttons.forEach((item) => {
  item.addEventListener("click", () => {
    container.classList.remove("hide-box");
  });
});

// Change copyright year automatically
window.addEventListener("load", () => {
  let date = new Date();
  let curr_date, next_date;
  curr_date = date.getFullYear();
  // next_date = date.getFullYear() + 1;
  footer.innerHTML = curr_date;
});
