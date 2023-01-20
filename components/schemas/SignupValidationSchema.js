import * as yup from "yup";

export const SignupValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email address is required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
  username: yup
    .string()
    .min(1, ({ min }) => `Username must be at least ${min} characters`)
    .max(25, ({ max }) => `Username can be maximum ${max} characters`)
    .required("Username is required"),
});
