// DOM elements
const registerForm = document.getElementById("register");
const loginForm = document.getElementById("login");
const changePassForm = document.getElementById("changePass");

// Inputs
const registerUsername = registerForm["username"];
const registerName = registerForm["name"];
const registerPass = registerForm["password"];
const confirmRegisterPassword = registerForm["confirmPass"];

const loginUsername = loginForm["username"];
const loginPassword = loginForm["password"];

const changeUsername = changePassForm["username"];
const currentPassword = changePassForm["currentPassword"];
const newPassword = changePassForm["newPassword"];
const confirmNewPassword = changePassForm["confirmNewPassword"];

let users = JSON.parse(localStorage.getItem("clients")) || [];

// Register user
function registerUser() {
    const user = {
        name: registerName.value,
        username: registerUsername.value,
        password: registerPass.value
    };

    users.push(user);
    localStorage.setItem("clients", JSON.stringify(users));
}

// Store logged-in user
function addUser(user) {
    localStorage.setItem("client", JSON.stringify(user));
}

// Change password
function changePass() {
    const index = users.findIndex(user => user.username === changeUsername.value);
    users[index].password = newPassword.value;

    const updatedUser = {
        name: users[index].name,
        username: users[index].username,
        password: newPassword.value
    };

    localStorage.setItem("client", JSON.stringify(updatedUser));
    localStorage.setItem("clients", JSON.stringify(users));
}

// Register form event
registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const userExists = users.some(user => user.username === registerUsername.value);

    if (userExists) {
        alert("Username already exists.");
    } else {
        if (registerPass.value === confirmRegisterPassword.value) {
            registerUser();
            alert("Registration successful.");
            registerForm.reset();
        } else {
            alert("Passwords do not match.");
        }
    }
});

// Login form event
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const user = users.find(user => user.username === loginUsername.value);

    if (user) {
        if (user.password === loginPassword.value) {
            addUser(user);
            alert("Login successful.");
            loginForm.reset();
        } else {
            alert("Incorrect password.");
        }
    } else {
        alert("User not found.");
        return;
    }
});

// Change password form event
changePassForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const index = users.findIndex(user => user.username === changeUsername.value);

    if (index !== -1 && users[index].password === currentPassword.value) {
        if (newPassword.value === confirmNewPassword.value) {
            changePass();
            alert("Password changed successfully.");
            changePassForm.reset();
        } else {
            alert("New passwords do not match.");
        }
    } else {
        alert("Invalid username or current password.");
    }
});
