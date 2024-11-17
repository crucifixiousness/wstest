document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const correctUsername = "user";
  const correctPassword = "pass";

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === correctUsername && password === correctPassword) {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      window.location.href = "dashboard.html";
  } else {
      document.getElementById('error-message').style.display = 'block';
  }
});

function decodeJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}


function handleCredentialResponse(response) {
  const jwt = response.credential;
  if (jwt) {
      const userInfo = decodeJwt(jwt);
      
      localStorage.setItem('username', userInfo.name);
      localStorage.setItem('email', userInfo.email);

      window.location.href = "home_shoe.html";
  }
}

function togglePasswordVisibility() {
  const passwordField = document.getElementById('password');
  passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
}