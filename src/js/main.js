let list = document.querySelector(".list");
let username = document.querySelector(".username");
let userinfo = document.querySelector(".userinfo");
let logout = document.getElementById("logout");
let user = localStorage.getItem("username");
if (user) {
  list.style.display = "none";
  username.style.display = "flex";
  userinfo.innerHTML = user;
}
logout.addEventListener("click", () => {
  username.style.display = "none";
  list.style.display = "flex";
  setInterval(() => {
    window.location = "signin.html";
  }, 2000);
});
