const form = document.querySelector("#loginForm");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let hasError = false;
  emailError.textContent = "";
  passwordError.textContent = "";

  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //kiểm tra định dạng email

  if (emailValue === "") {
    emailError.textContent = "Email không được để trống";
    hasError = true;
  } else if (!emailRegex.test(emailValue)) {
    emailError.textContent = "Email không đúng định dạng";
    hasError = true;
  }

  if (passwordValue === "") {
    passwordError.textContent = "Mật khẩu không được để trống";
    hasError = true;
  }

  if (!hasError) {
    window.confirm("Đăng nhập thành công");
    form.submit();
  }
});
