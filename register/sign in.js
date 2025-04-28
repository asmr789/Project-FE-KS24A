const form = document.querySelector("form");
const fullname = document.querySelector("#inputHo");
const firstname = document.querySelector("#inputTen");
const email = document.querySelector("#exampleInputEmail1");
const password = document.querySelector("#exampleInputPassword1");
const confirmPassword = document.querySelector("#exampleInputPassword2");
const checkbox = document.querySelector("#exampleCheck1");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    let valid = true;
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((message) => {
        message.textContent = "";
    });
    if (!fullname.value.trim() || !firstname.value.trim()) {
        showError(fullname, "Họ và tên không được để trống");
        valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError(email, "Email không được để trống");
        valid = false;
    } else if (!emailRegex.test(email.value)) {
        showError(email, "Email không đúng định dạng");
        valid = false;
    }

    if (!password.value.trim()) {
        showError(password, "Mật khẩu không được để trống");
        valid = false;
    } else if (password.value.length < 8) {
        showError(password, "Mật khẩu phải có tối thiểu 8 ký tự");
        valid = false;
    }

    if (!confirmPassword.value.trim()) {
        showError(confirmPassword, "Mật khẩu xác nhận không được để trống");
        valid = false;
    } else if (confirmPassword.value !== password.value) {
        showError(confirmPassword, "Mật khẩu xác nhận không trùng khớp");
        valid = false;
    }

    if (!checkbox.checked) {
        confirm("Bạn cần đồng ý với chính sách và điều khoản.");
        valid = false;
    }

    if (valid) {
        confirm("Đăng ký thành công!");
        form.reset();
        window.location.href="../Login/login.html"
    }
});

// Hàm hiển thị thông báo lỗi
function showError(input, message) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = message;
}