// Typing Effect
let text = "Master Python Easily 🚀";
let i = 0;

function typeEffect() {
    let el = document.getElementById("typing");
    if (!el) return;

    if (i < text.length) {
        el.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeEffect, 50);
    }
}

// Save Name
function saveName() {
    let input = document.getElementById("username");
    if (!input) return;

    let name = input.value;

    if (name === "") {
        alert("Enter your name first!");
        return;
    }

    localStorage.setItem("userName", name);

    let welcome = document.getElementById("welcome");
    if (welcome) {
        welcome.innerText = "Welcome " + name;
    }
}

// Start Learning
function startLearning() {
    let name = localStorage.getItem("userName");

    if (!name) {
        alert("Enter name first!");
        return;
    }

    window.location.href = "courses.html";
}

// Load Progress
function loadProgress() {
    let progressText = document.getElementById("progressText");
    if (!progressText) return;

    let completed = JSON.parse(localStorage.getItem("progress")) || [];
    let percent = (completed.length / 5) * 100;

    progressText.innerText = percent + "% Completed";
}

// ✅ FIXED Mark Complete (NO DUPLICATE + SORT)
function markComplete(unit) {
    let progress = JSON.parse(localStorage.getItem("progress")) || [];

    if (!progress.includes(unit)) {
        progress.push(unit);
    }

    // remove duplicates + sort
    progress = [...new Set(progress)].sort((a, b) => a - b);

    localStorage.setItem("progress", JSON.stringify(progress));

    alert("Unit " + unit + " completed!");
}

// Quiz
function checkQuiz(correct) {
    let selected = document.querySelector('input[name="q"]:checked');

    if (!selected) {
        alert("Select answer!");
        return;
    }

    if (selected.value === correct) {
        alert("Correct 🎉");
    } else {
        alert("Wrong ❌");
    }
}

// ✅ FIXED Continue Learning (NO SKIP BUG)
function continueLearning() {
    let progress = JSON.parse(localStorage.getItem("progress")) || [];

    progress = [...new Set(progress)].sort((a, b) => a - b);

    let next = 1;

    for (let i = 1; i <= 5; i++) {
        if (!progress.includes(i)) {
            next = i;
            break;
        }
    }

    if (next > 5) {
        alert("Course Completed 🎉");
        return;
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

// Copy Code
function copyCode(id) {
    let el = document.getElementById(id);
    if (!el) return;

    navigator.clipboard.writeText(el.innerText);
    alert("Copied! 📋");
}

// Update UI
function updateUI() {
    let progress = JSON.parse(localStorage.getItem("progress")) || [];
    let xp = progress.length * 10;

    let xpText = document.getElementById("xp");
    if (xpText) xpText.innerText = xp + " XP";

    let progressBar = document.getElementById("progressBar");
    if (progressBar) {
        let percent = (progress.length / 5) * 100;
        progressBar.style.width = percent + "%";
    }

    for (let i = 1; i <= 5; i++) {
        let card = document.getElementById("unit" + i);

        if (card) {
            if (i === 1 || progress.includes(i - 1)) {
                card.classList.remove("locked");
            } else {
                card.classList.add("locked");
            }

            if (progress.includes(i) && !card.innerHTML.includes("Completed")) {
                card.innerHTML += "<p>✅ Completed</p>";
            }
        }
    }
}

// On Load
window.onload = function () {
    typeEffect();
    loadProgress();
    updateUI();

    let savedName = localStorage.getItem("userName");
    let welcome = document.getElementById("welcome");

    if (savedName && welcome) {
        welcome.innerText = "Welcome back " + savedName;
    }
};