const form = document.getElementById("bookingForm");
const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");
const roomSelect = document.getElementById("room");
const guestSelect = document.getElementById("guests");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const requestsInput = document.getElementById("requests");
const message = document.getElementById("message");
const submitBtn = document.querySelector(".submit-btn");

// Price elements
const roomPriceSpan = document.getElementById("roomPrice");
const nightsSpan = document.getElementById("nights");
const totalPriceSpan = document.getElementById("totalPrice");

// Room prices mapping
const roomPrices = {
  single: 89,
  double: 149,
  deluxe: 199,
  suite: 299
};

// Set minimum dates
const today = new Date().toISOString().split("T")[0];
checkin.min = today;
checkout.min = today;

// Calculate and update prices
function updatePricing() {
  if (!checkin.value || !checkout.value || !roomSelect.value) {
    roomPriceSpan.textContent = "$0";
    nightsSpan.textContent = "0";
    totalPriceSpan.textContent = "$0";
    return;
  }

  const checkInDate = new Date(checkin.value);
  const checkOutDate = new Date(checkout.value);
  const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

  if (nights <= 0) {
    nightsSpan.textContent = "0";
    totalPriceSpan.textContent = "$0";
    return;
  }

  const pricePerNight = roomPrices[roomSelect.value] || 89;
  const totalPrice = pricePerNight * nights;

  roomPriceSpan.textContent = "$" + pricePerNight;
  nightsSpan.textContent = nights;
  totalPriceSpan.textContent = "$" + totalPrice;
}

// Event listeners for pricing updates
checkin.addEventListener("change", () => {
  if (checkin.value) {
    checkout.min = checkin.value;
    updatePricing();
  }
});

checkout.addEventListener("change", updatePricing);
roomSelect.addEventListener("change", updatePricing);

// Add animation effects on input focus
const inputs = document.querySelectorAll("input, select, textarea");
inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.parentElement.style.animation = "none";
  });

  input.addEventListener("blur", () => {
    if (input.value) {
      animateElement(input);
    }
  });
});

// Room selection visual feedback
roomSelect.addEventListener("change", () => {
  if (roomSelect.value) {
    animateElement(roomSelect);
  }
});

// Guest selection feedback
guestSelect.addEventListener("change", () => {
  if (guestSelect.value) {
    animateElement(guestSelect);
  }
});

// Form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Comprehensive validation
  if (!checkin.value) {
    showMessage("Please select a check-in date", "error");
    shakeElement(checkin);
    return;
  }

  if (!checkout.value) {
    showMessage("Please select a check-out date", "error");
    shakeElement(checkout);
    return;
  }

  if (checkout.value <= checkin.value) {
    showMessage("Check-out must be after check-in", "error");
    shakeElement(form);
    return;
  }

  if (!guestSelect.value) {
    showMessage("Please select number of guests", "error");
    shakeElement(guestSelect);
    return;
  }

  if (!roomSelect.value) {
    showMessage("Please select a room type", "error");
    shakeElement(roomSelect);
    return;
  }

  if (!nameInput.value.trim()) {
    showMessage("Please enter your full name", "error");
    shakeElement(nameInput);
    return;
  }

  if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
    showMessage("Please enter a valid email address", "error");
    shakeElement(emailInput);
    return;
  }

  // Calculate details
  const checkInDate = new Date(checkin.value);
  const checkOutDate = new Date(checkout.value);
  const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
  const pricePerNight = roomPrices[roomSelect.value];
  const totalPrice = pricePerNight * nights;

  // Show loading state
  submitBtn.classList.add("loading");
  submitBtn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    submitBtn.classList.remove("loading");
    submitBtn.disabled = false;

    // Generate booking reference
    const bookingRef = "BK" + Math.random().toString(36).substr(2, 9).toUpperCase();
    const roomType = getRoomTypeName(roomSelect.value);

    // Create detailed success message
    const successMessage = `✅ BOOKING CONFIRMED!\nReference: ${bookingRef}\nRoom: ${roomType}\nGuests: ${guestSelect.value}\nTotal: $${totalPrice} (${nights} night${nights > 1 ? "s" : ""})`;

    showMessage(successMessage, "success");
    animateSuccess();

    // Reset form
    form.reset();
    updatePricing();
  }, 2000);
});

// Helper functions
function showMessage(text, type) {
  message.textContent = text;
  message.className = `message ${type}`;
  message.style.animation = "none";

  setTimeout(() => {
    message.style.animation = "slideDown 0.4s ease";
  }, 10);
}

function shakeElement(element) {
  element.style.animation = "shake 0.3s ease";
  setTimeout(() => {
    element.style.animation = "";
  }, 300);
}

function animateElement(element) {
  element.parentElement.style.animation = "pulse 0.3s ease";
}

function animateSuccess() {
  const wrapper = document.querySelector(".form-wrapper");
  wrapper.style.animation = "pulse 0.6s ease";
  setTimeout(() => {
    wrapper.style.animation = "";
  }, 600);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function getRoomTypeName(value) {
  const roomNames = {
    single: "Single Room",
    double: "Double Room",
    deluxe: "Deluxe Suite",
    suite: "Presidential Suite"
  };
  return roomNames[value] || "Room";
}
