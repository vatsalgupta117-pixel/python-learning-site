// On Load (MERGED)
window.onload = function () {

    // Typing (only if exists)
    if (document.getElementById("typing")) {
        typeEffect();
    }

    // Progress text (only if exists)
    if (document.getElementById("progressText")) {
        loadProgress();
    }

    // Welcome name
    let savedName = localStorage.getItem("userName");
    if(savedName && document.getElementById("welcome")){
        document.getElementById("welcome").innerText = "Welcome back " + savedName;
    }

    // Update UI safely
    updateUI();
};

function updateUI() {
    let progress = JSON.parse(localStorage.getItem("progress")) || [];
    let xp = progress.length * 10;

    // XP safe
    let xpText = document.getElementById("xp");
    if (xpText) {
        xpText.innerText = xp + " XP";
    }

    // Progress bar safe
    let progressBar = document.getElementById("progressBar");
    if (progressBar) {
        let percent = (progress.length / 5) * 100;
        progressBar.style.width = percent + "%";
    }

    // Unit cards safe
    for (let i = 1; i <= 5; i++) {
        let card = document.getElementById("unit" + i);

        if (card) {
            if (i === 1 || progress.includes(i - 1)) {
                card.classList.remove("locked");
            } else {
                card.classList.add("locked");
            }

            // Avoid duplicate "Completed"
            if (progress.includes(i) && !card.innerHTML.includes("Completed")) {
                card.innerHTML += "<p>✅ Completed</p>";
            }
        }
    }
}