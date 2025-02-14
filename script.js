// Simulated database (Use an actual database for real projects)
let users = JSON.parse(localStorage.getItem("users")) || [];
let appointments = [
    { email: "johndoe@example.com", date: "2025-02-15", time: "10:30 AM", doctor: "Dr. Smith", reason: "General Checkup" }
];

// Redirect to dashboard if already logged in
if (localStorage.getItem("currentUser")) {
    window.location.href = "dashboard.html";
}

// Registration Logic
document.getElementById("register-form")?.addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration Successful! Please Login.");
    window.location.href = "index.html";
});

// Login Logic
document.getElementById("login-form")?.addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    
    let user = users.find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "dashboard.html";  // Redirect to dashboard
    } else {
        alert("Invalid credentials!");
    }
});

// Display User in Dashboard
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (currentUser) {
    document.getElementById("user-name")?.textContent = currentUser.name;
    document.getElementById("user-email")?.textContent = currentUser.email;
}

// Logout Functionality
document.getElementById("logout")?.addEventListener("click", function() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html"; // Redirect to login
});

// Load Appointments
if (currentUser) {
    const tableBody = document.querySelector("#appointments-table tbody");
    const userAppointments = appointments.filter(app => app.email === currentUser.email);
    userAppointments.forEach(app => {
        let row = `<tr><td>${app.date}</td><td>${app.time}</td><td>${app.doctor}</td><td>${app.reason}</td></tr>`;
        tableBody.innerHTML += row;
    });
}

// Print Appointments
function printAppointments() {
    window.print();
}
