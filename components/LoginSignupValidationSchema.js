import * as yup from "yup";

export const LoginSignupValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please eneter valid email")
    .required("Email address is required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
  // category: yup.string(),
  // image: yup
  //   .string()
  //   .min(8, ({ min }) => `Password must be at least ${min} characters`)
  //   .required("Password is required"),
  // description: yup
  //   .string()
  //   .max(200, "Beskrivningen får inte vara mer än 200 tecken.")
  //   .required("Password is required"),
  // price: yup
  //   .string()
  //   .min(8, ({ min }) => `Password must be at least ${min} characters`)
  //   .required("Password is required"),
  // location: yup.string(),
});
