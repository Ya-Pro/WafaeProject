let username = document.getElementById("username");
let password = document.getElementById("password");
let submit = document.getElementById("submit");
let paragraph = document.querySelector("p");
submit.addEventListener("click", (e) => {
  e.preventDefault();
  if (username.value == "" || password.value == "") {
    alert("please fill your all data");
  } else {
    if (
      username.value &&
      username.value === localStorage.getItem("username").trim() &&
      password.value === localStorage.getItem("password") &&
      password.value
    ) {
      setInterval(() => {
        location.href = "index.html";
      }, 2000);
    } else {
      paragraph.innerHTML = `Your username or password is <span style="color:red;font-weight: bold;">wrong</span> `;
    }
  }
});
