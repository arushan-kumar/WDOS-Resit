document.addEventListener('DOMContentLoaded', () => {
    // Define item prices for all product categories
    const itemPrices = {
        // Analgesics
        'paracetamol': 3,
        'ibuprofen': 5,
        'aspirin': 4,
        'diclofenac': 6,
        'naproxen': 7,
        'ketorolac': 8,

        // Antibiotics
        'amoxicillin': 10,
        'azithromycin': 12,
        'doxycycline': 15,
        'ciprofloxacin': 18,
        'cephalexin': 20,
        'metronidazole': 25,

        // Antidepressants
        'fluoxetine': 15,
        'sertraline': 17,
        'paroxetine': 20,
        'amitriptyline': 22,
        'venlafaxine': 25,
        'duloxetine': 30,

        // Antihistamines
        'loratadine': 5,
        'cetirizine': 7,
        'fexofenadine': 9,
        'diphenhydramine': 6,

        // Antihypertensives
        'atenolol': 10,
        'lisinopril': 12,
        'amlodipine': 14,
        'losartan': 16,
        'metoprolol': 18,
        'hydrochlorothiazide': 20
    };

    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    // Add items to cart
    document.querySelectorAll('section button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.closest('section');
            const select = section.querySelector('select');
            const quantityInput = section.querySelector('input[type="number"]');
            const selectedItem = select.options[select.selectedIndex];
            const itemName = selectedItem.value;
            const itemText = selectedItem.text;
            const quantity = parseFloat(quantityInput.value);

            if (quantity > 0) {
                addItemToTable(itemText, quantity, itemPrices[itemName] * quantity);
                updateTotalPrice();
            }

            quantityInput.value = '';
        });
    });

    // Add items to the table in the cart
    function addItemToTable(name, quantity, price) {
        const tableBody = document.querySelector('#items-table tbody');
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = name;

        const quantityCell = document.createElement('td');
        quantityCell.textContent = `${quantity} pack`;

        const priceCell = document.createElement('td');
        priceCell.textContent = `$${price.toFixed(2)}`;

        row.appendChild(nameCell);
        row.appendChild(quantityCell);
        row.appendChild(priceCell);
        tableBody.appendChild(row);
    }

    // Update the total price in the cart
    function updateTotalPrice() {
        const tableBody = document.querySelector('#items-table tbody');
        let totalPrice = 0;

        tableBody.querySelectorAll('tr').forEach(row => {
            const priceCell = row.children[2];
            const price = parseFloat(priceCell.textContent.replace('$', ''));
            totalPrice += price;
        });

        document.getElementById('total-price').textContent = `$${totalPrice.toFixed(2)}`;
    }

    // Save items to favourites
    document.getElementById('add-to-favourites').addEventListener('click', () => {
        favourites = [];
        const tableBody = document.querySelector('#items-table tbody');
        tableBody.querySelectorAll('tr').forEach(row => {
            const name = row.children[0].textContent;
            const quantity = parseFloat(row.children[1].textContent.replace(' pack', ''));
            const price = parseFloat(row.children[2].textContent.replace('$', ''));
            favourites.push({ name, quantity, price });
        });
        localStorage.setItem('favourites', JSON.stringify(favourites));
        alert('Items added to favourites!');
    });

    // Apply favourite items to the cart
    document.getElementById('apply-favourites').addEventListener('click', () => {
        const tableBody = document.querySelector('#items-table tbody');
        tableBody.innerHTML = '';

        favourites.forEach(item => {
            addItemToTable(item.name, item.quantity, item.price);
        });
        updateTotalPrice();
    });

    // Redirect to the order summary page
    function redirectpage() {
        const tableBody = document.querySelector('#items-table tbody');
        if (tableBody.querySelectorAll('tr').length === 0) {
            alert('Please add items to your cart before proceeding.');
        } else {
            const cartitems = [];
            tableBody.querySelectorAll('tr').forEach(row => {
                const name = row.children[0].textContent;
                const quantity = parseFloat(row.children[1].textContent.replace(' pack', ''));
                const price = parseFloat(row.children[2].textContent.replace('$', ''));
                cartitems.push({ name, quantity, price });
            });
            localStorage.setItem('cartitems', JSON.stringify(cartitems));
            localStorage.setItem('totalPrice', document.getElementById('total-price').textContent.replace('$', ''));
            window.location.href = "SummaryPage.html";
        }
    }

    const Buy_now = document.getElementById("buy-now");
    Buy_now.addEventListener("click", redirectpage);
});
