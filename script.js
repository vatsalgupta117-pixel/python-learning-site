// Typing Effect
let text = "Master Python Easily 🚀";
let i = 0;

function typeEffect() {
    if (i < text.length) {
        document.getElementById("typing").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeEffect, 50);
    }
}

// Save Name
function saveName() {
    let name = document.getElementById("username").value;

    if(name === "") {
        alert("Enter your name first!");
        return;
    }

    localStorage.setItem("userName", name);
    document.getElementById("welcome").innerText = "Welcome " + name;
}

// Start Learning
function startLearning() {
    let name = localStorage.getItem("userName");

    if(!name) {
        alert("Enter name first!");
        return;
    }

    window.location.href = "index.html";
}

// Progress
function loadProgress() {
    let completed = JSON.parse(localStorage.getItem("progress")) || [];
    let percent = (completed.length / 5) * 100;
    document.getElementById("progressText").innerText = percent + "% Completed";
}

// Mark Complete
function markComplete(unit) {
    let progress = JSON.parse(localStorage.getItem("progress")) || [];

    if(!progress.includes(unit)) {
        progress.push(unit);
        localStorage.setItem("progress", JSON.stringify(progress));
        alert("Unit " + unit + " completed!");
    }
}

// Quiz
function checkQuiz(correct) {
    let selected = document.querySelector('input[name="q"]:checked');

    if(!selected) {
        alert("Select answer!");
        return;
    }

    if(selected.value === correct) {
        alert("Correct 🎉");
    } else {
        alert("Wrong ❌");
    }
}

// Scroll Animation
window.addEventListener("scroll", () => {
    let sections = document.querySelectorAll(".section");

    sections.forEach(sec => {
        let pos = sec.getBoundingClientRect().top;

        if(pos < window.innerHeight - 100){
            sec.classList.add("show");
        }
    });
});

// On Load
window.onload = function() {
    typeEffect();
    loadProgress();

    let savedName = localStorage.getItem("userName");
    if(savedName){
        document.getElementById("welcome").innerText = "Welcome back " + savedName;
    }
}

// Load everything
window.onload = function () {
    updateUI();
};

// Update UI (progress + locks + XP)
function updateUI() {
    let progress = JSON.parse(localStorage.getItem("progress")) || [];
    let xp = progress.length * 10;

    document.getElementById("xp").innerText = xp + " XP";

    // Progress %
    let percent = (progress.length / 5) * 100;
    document.getElementById("progressBar").style.width = percent + "%";

    // Unlock system
    for (let i = 1; i <= 5; i++) {
        let card = document.getElementById("unit" + i);

        if (i === 1 || progress.includes(i - 1)) {
            card.classList.remove("locked");
        } else {
            card.classList.add("locked");
        }

        // Show completed
        if (progress.includes(i)) {
            card.innerHTML += "<p>✅ Completed</p>";
        }
    }
}

// Continue button
function continueLearning() {
    let progress = JSON.parse(localStorage.getItem("progress")) || [];

    let next = 1;
    for (let i = 1; i <= 5; i++) {
        if (!progress.includes(i)) {
            next = i;
            break;
        }
    }

    window.location.href = "unit" + next + ".html";
}

// Tabs
function showCode(id, btn) {
    let codes = document.querySelectorAll(".code-container");
    let buttons = document.querySelectorAll(".tab-btn");

    codes.forEach(c => c.style.display = "none");
    buttons.forEach(b => b.classList.remove("active"));

    document.getElementById(id).style.display = "block";
    btn.classList.add("active");
}

// Copy
function copyCode(id) {
    let text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text);
    alert("Copied! 📋");
}