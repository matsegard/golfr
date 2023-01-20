import * as yup from "yup";

export const UsernameValidationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, ({ min }) => `Username must be at least ${min} characters`)
    .max(25, ({ max }) => `Username can be maximum ${max} characters`)
    .required("Username is required"),
});
