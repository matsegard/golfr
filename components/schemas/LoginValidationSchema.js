import * as yup from "yup";

export const LoginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Ange korrekt mail")
    .required("Ange mail"),
  password: yup
    .string()
    .min(8, ({ min }) => `Lösenordet måste vara minst ${min} tecken`)
    .required("Ange korrekt lösenord"),
});
