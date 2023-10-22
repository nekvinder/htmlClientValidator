const phoneInputEl = document.querySelector("#phone");
const nameInputEl = document.getElementById("name");
const emailInputEl = document.getElementById("email");

const iti = window.intlTelInput(phoneInputEl, {
  initialCountry: "auto",
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.0/js/utils.js",
});

//validation login start

function setInvalid(fieldName, fieldErrorName, errorMessage) {
  document.getElementById(fieldErrorName).textContent = errorMessage;
  const color = errorMessage === "" ? "black" : "red";
  document.getElementById(fieldName).style.borderColor = color;
}

function validateName() {
  const fieldName = "name";
  const fieldErrorName = "nameError";

  setInvalid(fieldName, fieldErrorName, "");
  const userName = nameInputEl.value;
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

  const email = emailInputEl.value;
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

function main() {
  const eventName = "blur";
  const inputValidatorMaps = [
    { input: nameInputEl, validator: validateName },
    { input: emailInputEl, validator: validateEmail },
    { input: phoneInputEl, validator: validatePhone },
  ];

  for (const entry of inputValidatorMaps) {
    entry.input.addEventListener(eventName, function() {
      entry.validator();
      buttonValidator();
    });
  }
}

main();
