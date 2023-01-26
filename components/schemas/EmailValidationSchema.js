import * as yup from "yup";

export const EmailValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Ange korrekt mail")
    .required("Agne Email"),
});
