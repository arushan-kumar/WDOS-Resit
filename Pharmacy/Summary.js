document.addEventListener('DOMContentLoaded', () => {
    // Get cart items and total price from localStorage
    const orderItems = JSON.parse(localStorage.getItem('cartitems'));
    const totalPrice = localStorage.getItem('totalPrice');

    // Display cart items and total price
    if (orderItems && orderItems.length > 0) {
        const tableBody = document.querySelector('#items-table tbody');

        orderItems.forEach(item => {
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent = item.name;

            const quantityCell = document.createElement('td');
            quantityCell.textContent = item.quantity + (item.name.includes('kg') ? ' kg' : ' qty');

            const priceCell = document.createElement('td');
            priceCell.textContent = `$${item.price.toFixed(2)}`;

            row.appendChild(nameCell);
            row.appendChild(quantityCell);
            row.appendChild(priceCell);
            tableBody.appendChild(row);
        });

        document.getElementById('total-price').textContent = `$${parseFloat(totalPrice).toFixed(2)}`;
    }
});

// Confirm order details and payment
function confirmOrder() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    // Validate input fields
    if (!name || !email || !address || !paymentMethod) {
        alert("Please fill out all required fields.");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (paymentMethod.value === 'card') {
        if (!cardNumber || !expiryDate || !cvv) {
            alert("Please fill out all card details.");
            return;
        }

        const cardPattern = /^\d{16}$/;
        if (!cardPattern.test(cardNumber)) {
            alert("Please enter a valid 16-digit card number.");
            return;
        }

        const cvvPattern = /^\d{3}$/;
        if (!cvvPattern.test(cvv)) {
            alert("Please enter a valid 3-digit CVV.");
            return;
        }

        const currentDate = new Date();
        const expiryDateObj = new Date(expiryDate);
        if (expiryDateObj < currentDate) {
            alert("The expiry date must be in the future.");
            return;
        }
    }

    // Set a delivery date
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);

    document.getElementById('confirmation-message').innerHTML = 
        `Thank you, ${name}, for your purchase! Your order will be delivered on <strong>${deliveryDate.toDateString()}</strong>.`;
}
