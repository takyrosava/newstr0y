let users = JSON.parse(localStorage.getItem("users")) || [];
const loginForm = document.getElementById("loginForm");

loginForm.onsubmit = e => {
  e.preventDefault();
  const login = document.getElementById("loginLogin").value.trim();
  const pass = document.getElementById("loginPass").value;
  const user = users.find(u => u.login === login && u.pass === pass);

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert(`Welcome back, ${login}!`);
    window.location.href = "assortment.html"; 
  } else {
    alert("Неверный логин или пароль");
  }
};
