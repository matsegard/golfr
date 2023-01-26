import * as yup from "yup";

export const UsernameValidationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, ({ min }) => `Användarnamnet måste vara minst ${min} tecken`)
    .max(25, ({ max }) => `Användarnamnet kan max vara ${max} tecken`)
    .required("Ange användarnamn"),
});
