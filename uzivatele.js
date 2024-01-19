class User {
  constructor(name, surname, username, password, age, gender, status) {
    this.name = name;
    this.surname = surname;
    this.username = username;
    this.password = password;
    this.age = age;
    this.gender = gender;
    this.status = status;
  }
}

function showRegistrationForm() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>Registration Form</h2>
    <form id="registrationForm">
      <label for="name">Name:</label>
      <input type="text" id="name" required>
      
      <label for="surname">Surname:</label>
      <input type="text" id="surname" required>
      
      <label for="username">Username:</label>
      <input type="text" id="username" required>
      
      <label for="password">Password:</label>
      <input type="password" id="password" required>
      
      <label for="age">Age:</label>
      <input type="number" id="age" required>
      
      <label for="gender">Gender:</label>
      <select id="gender" required>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      
      <label for="status">Status:</label>
      <select id="status" required>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      
      <button type="button" onclick="registerUser()">Register</button>
    </form>
  `;
}

function registerUser() {
  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const status = document.getElementById("status").value;

  if (!name || !surname || !username || !password || !age || !gender || !status) {
    alert("Please fill in all fields.");
    return;
  }

  const newUser = new User(name, surname, username, password, age, gender, status);

  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));

  alert("User registered successfully!");
}

function showUserList() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>User List</h2>
    <ul id="userList"></ul>
  `;

  const userList = document.getElementById("userList");
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.length === 0) {
    userList.innerHTML = "<li>No users registered yet.</li>";
  } else {
    users.forEach(user => {
      const listItem = document.createElement("li");
      listItem.textContent = `${user.name} ${user.surname} (Username: ${user.username}, Age: ${user.age}, Status: ${user.status})`;
      userList.appendChild(listItem);
    });
  }
}

function showLogin() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>Login Form</h2>
    <form id="loginForm">
      <label for="loginUsername">Username:</label>
      <input type="text" id="loginUsername" required>
      
      <label for="loginPassword">Password:</label>
      <input type="password" id="loginPassword" required>
      
      <button type="button" onclick="loginUser()">Login</button>
    </form>
  `;
}

function loginUser() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  if (!username || !password) {
    alert("Please fill in both username and password.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.username === username);

  if (!user) {
    alert("User not found. Please check your username.");
    return;
  }

  if (user.password === password) {
    alert("Login successful!");
  } else {
    alert("Incorrect password. Please try again.");
  }
}
