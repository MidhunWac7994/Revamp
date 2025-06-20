/*---------
this file contains form validators to be passed with informed form library
-------*/
const SUCCESS = undefined;

export const NUMBER_REGEX = /^\d+$/;
export const IS_REQUIRED_MESSAGE = "This_field_is_required";

export const isRequired = (value) => {
  var regex = /\S/; // Check for non-whitespace characters
  const whitespaceRegex = /^\s+/;

  if (value) {
    if (whitespaceRegex.test(value)) return "White_space_not_allowed";
  } else if (!value || !regex.test(value)) {
    return "This_field_is_required";
  }
};

export const validateEmail = (value) => {
  const regex =
    /^(?=.{1,50}$)(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!regex.test(value)) {
    return "Not_a_valid_email_Id";
  }
};

export const validateName = (value) => {
  var regex = /^[a-zA-Z$ ]{1,30}$/;

  if (!regex.test(value)) {
    return "Name_only_accepts_alphabets";
  }
};

export const validateAge = (value) => {
  const today = new Date();
  const birthDate = new Date(value);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  if (age < 18) {
    return "You_must_be_at_least_18_years_old";
  }
};

export const validateLength = (value) => {
  if (value.length <= 2) {
    return "Name_should_be_more_than_2_letters";
  }
};

export const validatePhone = (value) => {
  const [, phoneNumber] = value?.split(" ") || [];

  if (!NUMBER_REGEX.test(phoneNumber)) {
    return "Not_a_valid_number";
  }
};

export const validatePincode = (value) => {
  var regex = /^[1-9][0-9]{5}$/;
  if (!regex.test(value)) {
    return "Not_a_valid_pincode";
  }
};

export const validateOtp = (value) => {
  if (value?.length !== 4) return "Otp_Should_be_4_digit";
};

export const validatePassword = (value) => {
  const whitespaceRegex = /\s+/;
  if (value?.length < 6) return "Password_must_be_at_least_6_characters";
  if (whitespaceRegex.test(value)) return "White_space_not_allowed";
};

export const validateEmailorPhone = (value) => {
  const trimmedValue = value && value?.trim();

  if (validatePhone(trimmedValue) !== undefined) {
    if (validateEmail(trimmedValue) !== undefined) {
      return "Not_a_valid_phone_number_or_email_id";
    }
  }
};

export const validateConfirmPassword = (
  value,
  values,
  passwordKey = "newpassword"
) => {
  if (value !== values[passwordKey]) return "Passwords_do_not_match";
};

export const validateAlternateNumber = (
  value,
  values,
  key = "mobile_number"
) => {
  if (value === values[key]) return "Alternate_number_should_not_be_the_same";
};

export const validateSpecialCharactersOnly = (value) => {
  const regex = /^(?=.*[a-zA-Z])[a-zA-Z0-9\s]*$/;
  if (!regex.test(value)) {
    return "Special_characters_only_are_not_allowed";
  }
};

export function isEmail(email) {

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const validExpiry = (value) => {
  const year = Number(value?.substring(3));
  const month = Number(value?.substring(0, 2));
  const yearLength = value?.substring(3)?.length === 2;
  const monthLength = value?.substring(0, 2)?.length === 2;

  const date = new Date();
  const fullYear = date.getFullYear();
  const lastTwoDigits = fullYear % 100;

  if (month < 1 || month > 12) {
    return "Month_must_be_between_01_and_12";
  } else if (yearLength && year < lastTwoDigits) {
    return "Past_year_not_allowed";
  } else if (
    yearLength &&
    year === lastTwoDigits &&
    monthLength &&
    month < date.getMonth()
  ) {
    return "Past_date_not_allowed";
  }
};

export const validateNumbers = (value) => {
  if (typeof value !== "number") {
    return "Please enter a number";
  }

  if (/^[1-9][0-9]*$/.test(value) === false) {
    return "Enter a valid number";
  }
};
