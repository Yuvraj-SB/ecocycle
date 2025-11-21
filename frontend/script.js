function toggleRegister() {
    const usernameInput = document.getElementById("usernameInput");
    const registerBtn = document.getElementById("registerBtn");
    const toggleBtn = document.getElementById("toggleBtn");
    
    if (usernameInput.style.display === "none") {
        usernameInput.style.display = "inline-block";
        registerBtn.style.display = "inline-block";
        toggleBtn.textContent = "Cancel";
    } else {
        usernameInput.style.display = "none";
        registerBtn.style.display = "none";
        toggleBtn.textContent = "Register";
    }
}

function register() {
    const email = document.getElementById("userIdInput").value.trim();
    const username = document.getElementById("usernameInput").value.trim();
    
    if (!email || !username) {
        alert("Please enter both email and username");
        return;
    }

    fetch("http://localhost:8083/auth/register?email=" + encodeURIComponent(email) + 
          "&username=" + encodeURIComponent(username), {
        method: "POST"
    })
    .then(res => {
        if (!res.ok) {
            return res.text().then(text => {
                throw new Error(text || "HTTP " + res.status);
            });
        }
        return res.text();
    })
    .then(message => {
        alert("Registration successful!");
        document.getElementById("result").textContent = "Registration successful! You can now call services.";
        toggleRegister(); // Hide registration fields
    })
    .catch(err => {
        const errorMsg = err.message || err;
        alert("Registration failed: " + errorMsg);
        document.getElementById("result").textContent = "Registration error: " + errorMsg;
    });
}

function login() {
    const email = document.getElementById("userIdInput").value.trim();
    
    if (!email) {
        alert("Please enter an email address");
        return;
    }

    fetch("http://localhost:8083/auth/login?email=" + encodeURIComponent(email), {
        method: "POST"
    })
    .then(res => {
        if (!res.ok) {
            return res.text().then(text => {
                throw new Error(text || "HTTP " + res.status);
            });
        }
        return res.text();
    })
    .then(message => {
        alert("Login successful!");
        document.getElementById("result").textContent = "Login successful! You can now call services.";
    })
    .catch(err => {
        const errorMsg = err.message || err;
        if (errorMsg.includes("404") || errorMsg.includes("not found")) {
            alert("User not found. Please register first.");
            document.getElementById("result").textContent = "User not found. Click 'Register' to create an account.";
        } else {
            alert("Login failed: " + errorMsg);
            document.getElementById("result").textContent = "Login error: " + errorMsg;
        }
    });
}

function callService(service) {
    let url = "";

    if (service === "users") url = "http://localhost:8083/users";
    if (service === "marketplace") url = "http://localhost:8081/listings";
    if (service === "transactions") url = "http://localhost:8082/transactions";

    if (!url) {
        document.getElementById("result").textContent = "Error: Unknown service";
        return;
    }

    fetch(url)
    .then(res => {
        if (!res.ok) {
            throw new Error("HTTP " + res.status);
        }
        return res.json();
    })
    .then(data => {
        document.getElementById("result").textContent =
            JSON.stringify(data, null, 2);
    })
    .catch(err => {
        document.getElementById("result").textContent =
            "Error connecting to " + service + ": " + err;
    });
}
