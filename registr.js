let users = JSON.parse(localStorage.getItem("users")) || [];
const registerForm = document.getElementById("registerForm");

registerForm.onsubmit = e => {
  e.preventDefault();
  const login = document.getElementById("regLogin").value.trim();
  const pass = document.getElementById("regPass").value;
  const pass2 = document.getElementById("regPass2").value;

  if(pass.length < 6) { alert("Пароль должен быть ≥6 символов"); return; }
  if(pass !== pass2) { alert("Пароли не совпадают"); return; }
  if(users.find(u => u.login === login)) { alert("Логин уже занят"); return; }

  users.push({ login, pass });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Регистрация успешна!");
  registerForm.reset();
};
