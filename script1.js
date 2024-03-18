//--------------------------------------------------------LOGIN PAGE SCRIPT-----------------------------------

//HOMEPAGE
window.addEventListener('scroll', function () {
    var button = document.querySelector('.btn-getstarted');
    var description = document.querySelector('#desc');

    var scrollPosition = window.pageYOffset;

    if (scrollPosition > 1) {
        button.classList.add('btn-appear');
        description.classList.add('desc-hide');
    } else {
        button.classList.remove('btn-appear');
        description.classList.remove('desc-hide');
    }
});


//---------------------LOGIN REGISTRATION TRANSITION----------------

const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
})

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
})


//-------FORM VALIDATION-------------------

var EmailError = document.getElementById('email-error');
var EmailError2 = document.getElementById('email-error2');
var EmailField = document.getElementById('email-field');
var EmailField2 = document.getElementById('email-field2');

function validateEmail() {
    if (!EmailField.value.match(/^[A-Za-z\._\-0-9]+[@][A-Za-z]+[\.][a-z]{2,4}([\.][a-z]{2,4})?$/)) {
        EmailError.innerHTML = "please enter a valid email";
        EmailField.style.borderBottomColor = "red";
        EmailError.style.top = "120%";
        return false;
    }
    EmailError.innerHTML = "";
    EmailField.style.borderBottomColor = "green";
    EmailError.style.top = "100%";
    return true;

}

function validateEmail2() {
    if (!EmailField2.value.match(/^[A-Za-z\._\-0-9]+[@][A-Za-z]+[\.][a-z]{2,4}([\.][a-z]{2,4})?$/)) {
        EmailError2.innerHTML = "please enter a valid email";
        EmailField2.style.borderBottomColor = "red";
        EmailError2.style.top = "120%";
        return false;
    }
    EmailError2.innerHTML = "";
    EmailField2.style.borderBottomColor = "green";
    EmailError2.style.top = "100%";
    return true;
}

// Function to validate the password
function validatePassword() {
    const passwordInput = document.getElementById('psw');
    const passwordError = document.getElementById('psw-error2');

    // Regular expression for password validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!passwordRegex.test(passwordInput.value)) {
        passwordInput.classList.add('invalid');
        passwordError.textContent =
            'Password must contain at least one number, one uppercase letter, one lowercase letter, and be at least 8 characters long.';
        return false;
    } else {
        passwordInput.classList.remove('invalid');
        passwordError.textContent = '';
        return true;
    }
}

// Add event listener to the password input
const passwordInput = document.getElementById('psw');
passwordInput.addEventListener('input', validatePassword);


// Function to validate the username
function validateUsername() {
    const usernameInput = document.getElementById('username-field');
    const usernameError = document.getElementById('username-error');



    // Regular expression for username validation
    const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;

    if (!usernameRegex.test(usernameInput.value)) {
        usernameInput.classList.add('invalid');
        usernameError.textContent =
            'Username must be 3-16 characters long and can contain letters, numbers, underscore, and hyphen.';
        return false;
    } else {
        usernameInput.classList.remove('invalid');
        usernameError.textContent = '';
        return true;
    }
}

// Add event listener to the username input
const usernameInput = document.getElementById('username');
usernameInput.addEventListener('input', validateUsername);

function validateForm() {
    if (validateEmail2() && validatePassword() && validateUsername()) {
        return true;
    }
    else return false;
}

/*Javascript for toggle password*/ 

function togglePasswordVisibility() {
    var passwordInput = document.getElementById("password");
    var eyeIcon = document.querySelector(".toggle-password ion-icon");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.setAttribute("name", "eye-off");
    } else {
        passwordInput.type = "password";
        eyeIcon.setAttribute("name", "eye");
    }
}

function PasswordVisblity( inputId) {
    var passwordInput = document.getElementById(inputId);
    var eyeIcon = passwordInput.nextElementSibling.querySelector("ion-icon");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.setAttribute("name", "eye-off");
    } else {
        passwordInput.type = "password";
        eyeIcon.setAttribute("name", "eye");
    }
}
