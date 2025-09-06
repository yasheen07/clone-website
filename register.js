document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const passwordConfirmInput = document.getElementById('password-confirm');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const passwordConfirmError = document.getElementById('password-confirm-error');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        // Name validation
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Please enter your name.';
            valid = false;
        } else {
            nameError.textContent = '';
        }

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

        // Password confirmation validation
        if (passwordInput.value !== passwordConfirmInput.value) {
            passwordConfirmError.textContent = 'Passwords do not match.';
            valid = false;
        } else {
            passwordConfirmError.textContent = '';
        }

        if (valid) {
            // Dummy registration
            window.location.href = 'index.html';
        }
    });

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePassword(password) {
        const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/; 
        return re.test(password);
    }
});