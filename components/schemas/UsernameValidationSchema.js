import * as yup from "yup";

export const UsernameValidationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, ({ min }) => `Password must be at least ${min} characters`)
    .required("Username is required"),
});
