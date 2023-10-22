var phoneInput = document.querySelector("#phone");
var iti = window.intlTelInput(phoneInput, {
  initialCountry: "auto",
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.0/js/utils.js",
});

function validateName() {
  var firstName = document.getElementById("name").value;
  document.getElementById("nameError").textContent = "";
  document.getElementById("name").style.borderColor = "";
  if (firstName === "") {
    document.getElementById("nameError").textContent =
      "First name is mandatory!";
    document.getElementById("name").style.borderColor = "red";
    isValid = false;
  } else if (firstName.length < 3) {
    document.getElementById("nameError").textContent =
      "First name is too short!";
    document.getElementById("name").style.borderColor = "red";
    isValid = false;
  }
}

function validateEmail() {
  var email = document.getElementById("email").value;
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  document.getElementById("emailError").textContent = "";
  document.getElementById("email").style.borderColor = "";
  if (email === "") {
    document.getElementById("emailError").textContent = "Email is mandatory!";
    document.getElementById("email").style.borderColor = "red";
    isValid = false;
  } else if (!email.match(emailPattern)) {
    document.getElementById("emailError").textContent = "Invalid email format.";
    document.getElementById("email").style.borderColor = "red";
    isValid = false;
  }
}

function validatePhone() {
  var phone = iti.getNumber();
  var submitButton = document.getElementById("submitButton");

  function isValidPhoneNumber(phoneNumber) {
    try {
      var parsedPhoneNumber =
        window.libphonenumber.parsePhoneNumberFromString(phoneNumber);
      return parsedPhoneNumber && parsedPhoneNumber.isValid();
    } catch (error) {
      return false;
    }
  }

  if (phone === "") {
    document.getElementById("phoneError").textContent = "Phone is mandatory!";
    document.getElementById("phone").style.borderColor = "red";
    isValid = false;
  } else if (!phone || !isValidPhoneNumber(phone)) {
    document.getElementById("phoneError").textContent = "Invalid phone number";
    document.getElementById("phone").style.borderColor = "red";
    isValid = false;
  }

  document.getElementById("phoneError").textContent = "";
  document.getElementById("phone").style.borderColor = "";
}

function buttonValidator() {
  const isValid = validateName() && validateEmail() && validatePhone();

  submitButton.disabled = !isValid;
  submitButton.style.opacity = isValid ? 1 : 0.5;
}

document.getElementById("name").addEventListener("input", function() {
  validateName();
});

document.getElementById("email").addEventListener("input", function() {
  validateEmail();
});

phoneInput.addEventListener("input", function() {
  validatePhone();
});

// // Import intlTelInput
// import intlTelInput from 'intl-tel-input';

// // Function to validate the name field
// function validateName() {
//   const nameInput = document.getElementById('name');
//   const nameError = document.getElementById('nameError');
//   const nameValue = nameInput.value.trim();

//   if (nameValue.length < 3) {
//     nameInput.style.borderColor = 'red';
//     nameError.style.color = 'red';
//     nameError.textContent = 'Name must be at least 3 characters';
//     return false;
//   } else {
//     nameInput.style.borderColor = '';
//     nameError.textContent = '';
//     return true;
//   }
// }

// // Function to validate the email field using regex
// function validateEmail() {
//   const emailInput = document.getElementById('email');
//   const emailError = document.getElementById('emailError');
//   const emailValue = emailInput.value.trim();
//   const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//   if (!emailPattern.test(emailValue)) {
//     emailInput.style.borderColor = 'red';
//     emailError.style.color = 'red';
//     emailError.textContent = 'Invalid email address';
//     return false;
//   } else {
//     emailInput.style.borderColor = '';
//     emailError.textContent = '';
//     return true;
//   }
// }

// // Function to validate the phone field using intl-tel-input
// function validatePhone() {
//   const phoneInput = document.getElementById('phone');
//   const phoneError = document.getElementById('phoneError');
//   const phoneValue = phoneInput.value.trim();
//   const telInput = intlTelInput(phoneInput);
//   const isValidNumber = telInput.isValidNumber();

//   if (!isValidNumber) {
//     phoneInput.style.borderColor = 'red';
//     phoneError.style.color = 'red';
//     phoneError.textContent = 'Invalid phone number';
//     return false;
//   } else {
//     phoneInput.style.borderColor = '';
//     phoneError.textContent = '';
//     return true;
//   }
// }

// // Add event listeners for real-time validation
// const nameInput = document.getElementById('name');
// const emailInput = document.getElementById('email');
// const phoneInput = document.getElementById('phone');
// const form = document.getElementById('form');
// const submitButton = document.getElementById('submitButton');

// nameInput.addEventListener('input', validateName);
// emailInput.addEventListener('input', validateEmail);
// phoneInput.addEventListener('input', validatePhone);
// form.addEventListener('submit', handleSubmit);

// // Initially disable the submit button
// submitButton.disabled = true;

// // Enable the submit button when the form is valid
// form.addEventListener('input', () => {
//   if (validateName() && validateEmail() && validatePhone()) {
//     submitButton.disabled = false;
//   } else {
//     submitButton.disabled = true;
//   }
// });
