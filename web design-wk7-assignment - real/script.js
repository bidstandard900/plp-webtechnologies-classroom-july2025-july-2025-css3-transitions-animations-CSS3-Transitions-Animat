// ===== GLOBAL VARIABLES =====
let popupVisible = false; // global scope variable

// ===== FUNCTION DEFINITIONS =====

// A reusable function to select DOM elements
function $(selector) {
    return document.querySelector(selector);
}

// Function to toggle popup (demonstrates scope + DOM manipulation)
function togglePopup(message) {
    const popup = $("#popup");
    if (!popup) return;

    if (!popupVisible) {
        popup.innerHTML = `<div class="popup-box">${message}</div>`;
        popup.classList.add("show");
        popupVisible = true;
    } else {
        popup.classList.remove("show");
        popupVisible = false;
    }
}

// Function to validate form input (parameters + return value)
function validateForm(name, email, message) {
    if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
        return false;
    }
    if (!email.includes("@")) {
        return false;
    }
    return true;
}

// Function to trigger animation on service cards
function animateCard(cardElement, color) {
    if (!cardElement) return;
    cardElement.style.borderColor = color;
    cardElement.classList.add("active-card");
    setTimeout(() => {
        cardElement.classList.remove("active-card");
    }, 1000);
}

// ===== EVENT LISTENERS =====
document.addEventListener("DOMContentLoaded", () => {
    // Training button event
    const trainingBtn = $("#training-btn");
    if (trainingBtn) {
        trainingBtn.addEventListener("click", () => {
            togglePopup("<h3>Upcoming Training</h3><p>Data Analytics Bootcamp - Oct 10<br>Cybersecurity Essentials - Oct 20<br>AI & ML Advanced - Nov 5</p>");
        });
    }

    // Contact form event
    const contactForm = $("#contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            let name = $("#name").value;
            let email = $("#email").value;
            let message = $("#message").value;

            if (validateForm(name, email, message)) {
                togglePopup(`<h3>Thank you, ${name}!</h3><p>Your message has been sent successfully.</p>`);
                contactForm.reset();
            } else {
                togglePopup("<p style='color:red;'>Please fill all fields correctly.</p>");
            }
        });
    }

    // Service cards animation on click
    const serviceCards = document.querySelectorAll(".service-card");
    const colors = ["#48dbfb", "#ff6b6b", "#1dd1a1", "#feca57", "#5f27cd", "#ff9ff3"];

    serviceCards.forEach((card, index) => {
        card.addEventListener("click", () => {
            animateCard(card, colors[index % colors.length]);
        });
    });
});
