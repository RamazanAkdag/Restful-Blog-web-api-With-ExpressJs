const registerForm = document.getElementById("registerForm");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirmPassword");
const emailInput = document.querySelector("#email");

const eventListeners = () => {
  registerForm.addEventListener("submit", addUserToServer);
};

function addUserToServer(e) {
  e.preventDefault();
  console.log("selamlarr");
  const userNameValue = usernameInput.value.trim();
  const userMail = emailInput.value.trim();
  const userPassword = passwordInput.value.trim();
  const confirmPass = confirmPasswordInput.value.trim();
  if (!userNameValue || !userPassword) {
    console.log("Kullanıcı adı ve şifre zorunludur.");
    return;
  }
  if (userPassword !== confirmPass) {
    console.log("Şifreler eşleşmiyor.");
    return;
  }

  const requestBody = {
    username: userNameValue,
    password: userPassword,
    email: userMail,
  };
  console.log(requestBody);
  const url = "http://localhost:5000/api/auth/register";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Başarılı:", data);
    })
    .catch((error) => {
      console.error("Hata:", error);
    });
}

eventListeners();
