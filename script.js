const phoneInput = document.querySelector("#phone");
const iti = window.intlTelInput(phoneInput, {
  initialCountry: "auto",
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.0/js/utils.js",
});

function setInvalid(fieldName, fieldErrorName, errorMessage) {
  document.getElementById(fieldErrorName).textContent = errorMessage;
  const color = errorMessage === "" ? "black" : "red";
  document.getElementById(fieldName).style.borderColor = color;
}

function validateName() {
  const fieldName = "name";
  const fieldErrorName = "nameError";

  setInvalid(fieldName, fieldErrorName, "");
  const userName = document.getElementById("name").value;
  if (userName === "") {
    setInvalid(fieldName, fieldErrorName, "Name is mandatory!");
    return false;
  } else if (userName.length < 3) {
    setInvalid(fieldName, fieldErrorName, "Name is too short!");
    return false;
  }
  return true;
}

function validateEmail() {
  const fieldName = "email";
  const fieldErrorName = "emailError";

  const email = document.getElementById("email").value;
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  setInvalid(fieldName, fieldErrorName, "");
  if (email === "") {
    setInvalid(fieldName, fieldErrorName, "Email is mandatory!");
    return false;
  } else if (!email.match(emailPattern)) {
    setInvalid(fieldName, fieldErrorName, "Invalid email address");
    return false;
  }
  return true;
}

function validatePhone() {
  const phone = iti.getNumber();

  function isValidPhoneNumber(phoneNumber) {
    try {
      const parsedPhoneNumber =
        window.libphonenumber.parsePhoneNumberFromString(phoneNumber);
      return parsedPhoneNumber && parsedPhoneNumber.isValid();
    } catch (error) {
      return false;
    }
  }

  setInvalid("phone", "phoneError", "");
  if (phone === "") {
    setInvalid("phone", "phoneError", "Phone is mandatory!");
    return false;
  } else if (!phone || !isValidPhoneNumber(phone)) {
    setInvalid("phone", "phoneError", "Invalid phone number");
    return false;
  }
  return true;
}

function buttonValidator() {
  const submitButton = document.getElementById("submitButton");
  const isValid = validateName() && validateEmail() && validatePhone();
  submitButton.disabled = !isValid;
  submitButton.style.opacity = isValid ? 1 : 0.5;
}

const eventName = "blur";
document.getElementById("name").addEventListener(eventName, function() {
  validateName();
  buttonValidator();
});

document.getElementById("email").addEventListener(eventName, function() {
  validateEmail();
  buttonValidator();
});

phoneInput.addEventListener(eventName, function() {
  validatePhone();
  buttonValidator();
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
