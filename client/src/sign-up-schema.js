import * as Yup from "yup";

const phone = /^1?[0-9]{3}-?[0-9]{3}-?[0-9]{4}$/;

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "At least 2 Chars!")
    .max(50, "Too Long!")
    .required("This field is Required!"),
  lastName: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("This field is Required!"),
  email: Yup.string()
    .email("Invalid email")
    .required("This field is Required!"),
  // phone: Yup.number("Must be a Number")
  //     .typeError("That doesn't look like a phone number")
  //     .positive("A phone number can't start with a minus")
  //     .integer("A phone number can't include a decimal point")
  //     .min(10)
  //     .required('A phone number is required'),
  phone: Yup.string()
    .matches(phone, "not a valid phone number")
    .required("A Phone Number Is Required!"),

  password: Yup.string()
    .min(8, "At least 8 Chars!")
    .max(50, "too long!")
    .required("This field is Required!"),
  confirmPassword: Yup.string()
    .required("Please retype your password.")
    .oneOf([Yup.ref("password")], "Your passwords do not match."),
});
