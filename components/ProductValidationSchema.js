import * as yup from "yup";

export const ProductValidationSchema = yup.object().shape({
  title: yup
    .string()
    .required("Fyll i en titel")
    .min(3, "Titeln måste vara minst tre tecken."),
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
