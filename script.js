document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Initialize EmailJS with your user ID
    emailjs.init("xjs_Unq1YeUn2jD8p");
    
    // Initialize Stripe
    const stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx'); // Replace with your Stripe publishable key
    
    // Format card number input with spaces
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = '';
            
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            
            e.target.value = formattedValue;
        });
    }
    
    // Modal functionality
    const paymentModal = document.getElementById('paymentModal');
    const processingModal = document.getElementById('processingModal');
    const buyButton = document.getElementById('buyButton');
    const closeButton = document.querySelector('.close');
    
    buyButton.addEventListener('click', function() {
        paymentModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });
    
    closeButton.addEventListener('click', function() {
        paymentModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === paymentModal) {
            paymentModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to current button and content
            this.classList.add('active');
            document.getElementById(tabId + 'Tab').classList.add('active');
        });
    });
    
    // Form submission for credit card
    const cardForm = document.getElementById('cardForm');
    const paypalForm = document.getElementById('paypalForm');
    
    cardForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s+/g, '');
        const cardName = document.getElementById('cardName').value;
        const expMonth = document.getElementById('expMonth').value;
        const expYear = document.getElementById('expYear').value;
        const cvc = document.getElementById('cvc').value;
        
        // Validate email format
        if (!validateEmail(email)) {
            alert('Por favor, introduce una dirección de correo electrónico válida.');
            return;
        }
        
        // Show processing modal
        paymentModal.style.display = 'none';
        processingModal.style.display = 'block';
        
        // Store customer data for success page
        sessionStorage.setItem('customerName', name);
        sessionStorage.setItem('customerEmail', email);
        sessionStorage.setItem('customerPhone', phone);
        sessionStorage.setItem('paymentMethod', 'Tarjeta de crédito');
        sessionStorage.setItem('purchaseAmount', '25.20');
        sessionStorage.setItem('purchaseDate', new Date().toLocaleDateString('es-ES'));
        
        console.log('Stored customer data:', {
            name,
            email,
            phone,
            paymentMethod: 'Tarjeta de crédito',
            purchaseAmount: '25.20',
            purchaseDate: new Date().toLocaleDateString('es-ES')
        });
        
        // Simulate payment processing
        setTimeout(function() {
            window.location.href = 'success.html';
        }, 2000);
    });
    
    // Form submission for PayPal
    paypalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const paypalEmail = document.getElementById('paypalEmail').value;
        const phone = document.getElementById('paypalPhone').value;
        
        // Validate email format
        if (!validateEmail(paypalEmail)) {
            alert('Por favor, introduce una dirección de correo electrónico válida.');
            return;
        }
        
        // Show processing modal
        paymentModal.style.display = 'none';
        processingModal.style.display = 'block';
        
        // Store customer data for success page
        sessionStorage.setItem('customerName', '');
        sessionStorage.setItem('customerEmail', paypalEmail);
        sessionStorage.setItem('customerPhone', phone);
        sessionStorage.setItem('paymentMethod', 'PayPal');
        sessionStorage.setItem('purchaseAmount', '25,20');
        sessionStorage.setItem('purchaseDate', new Date().toLocaleDateString('es-ES'));
        
        console.log('Stored customer data:', {
            name: '',
            email: paypalEmail,
            phone,
            paymentMethod: 'PayPal',
            purchaseAmount: '25,20',
            purchaseDate: new Date().toLocaleDateString('es-ES')
        });
        
        // Simulate PayPal payment processing
        setTimeout(function() {
            window.location.href = 'success.html';
        }, 2000);
    });
    
    // Email validation function
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});
