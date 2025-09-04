document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        // Email validation
        if (!validateEmail(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address.';
            valid = false;
        } else {
            emailError.textContent = '';
        }

        // Password validation
        if (!validatePassword(passwordInput.value)) {
            passwordError.textContent = 'Password must be at least 8 characters long and include a number and a symbol.';
            valid = false;
        } else {
            passwordError.textContent = '';
        }

        if (valid) {
            // Dummy authentication
            if (emailInput.value === 'test@example.com' && passwordInput.value === 'Password123!') {
                window.location.href = 'index.html';
            } else {
                passwordError.textContent = 'Invalid email or password.';
            }
        }
    });

    function validateEmail(email) {
        const re = /^(([^<>()[\\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePassword(password) {
        const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/; 
        return re.test(password);
    }
});