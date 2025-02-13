const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const bookTicketButton = document.getElementById("bookTicketButton");
const discountMessageElement = document.getElementById('discount-message');

// Fetch previously saved data and populate UI
populateUI();

// Get the ticket price from the currently selected movie
let ticketPrice = +movieSelect.value;

// Save selected movie index and price to localStorage
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update seat count and total price
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;
    let totalPrice = selectedSeatsCount * ticketPrice;

    // Apply 10% discount if more than 3 tickets are booked
    if (selectedSeatsCount > 3) {
        totalPrice *= 0.9;
        discountMessageElement.innerText = '10% festive discount applied!';
    } else {
        discountMessageElement.innerText = '';
    }

    count.innerText = selectedSeatsCount;
    total.innerText = totalPrice.toFixed(2);
}

// Load data from localStorage and populate the UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.includes(index)) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Movie select event
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// Seat click event
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

// Book Now button click event
bookTicketButton.addEventListener("click", function () {
    const selectedSeatsCount = document.querySelectorAll('.row .seat.selected').length;
    if (selectedSeatsCount === 0) {
        alert("Please select at least one seat to book your ticket.");
        return;
    }

    let totalPrice = selectedSeatsCount * ticketPrice;
    let discountMessage = "";

    // Apply 10% discount if more than 3 tickets are booked
    if (selectedSeatsCount > 3) {
        totalPrice *= 0.9;
        discountMessage = "\n🎉 A 10% festive discount has been applied!";
    }

    alert(`🎟️ You have booked ${selectedSeatsCount} tickets.\n💰 Total Price: ₹${totalPrice.toFixed(2)}${discountMessage}`);
});

// Book Now button hover effects
bookTicketButton.addEventListener("mouseover", function () {
    this.style.backgroundColor = "#d03800";
});
bookTicketButton.addEventListener("mouseout", function () {
    this.style.backgroundColor = "#ff4500";
});

// Initial count and total set
updateSelectedCount();
