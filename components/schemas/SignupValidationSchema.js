import * as yup from "yup";

export const SignupValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Ange korrekt email")
    .required("Ange email"),
  password: yup
    .string()
    .min(8, ({ min }) => `Lösenordet måste vara minst ${min} tecken`)
    .required("Ange lösenord"),
  username: yup
    .string()
    .min(1, ({ min }) => `Användarnamnet måste vara minst ${min} tecken`)
    .max(25, ({ max }) => `Användarnamnet kan max vara ${max} tecken`)
    .required("Ange användarnamnet"),
});
