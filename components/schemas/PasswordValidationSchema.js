import * as yup from "yup";

export const PasswordValidationSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, ({ min }) => `Lösenordet måste vara minst ${min} tecken`)
    .required("Ange lösenord"),
});
