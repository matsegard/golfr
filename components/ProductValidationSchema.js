import * as yup from "yup";

export const ProductValidationSchema = yup.object().shape({
  title: yup
    .string()
    .required("Fyll i en titel")
    .min(3, "Titeln måste vara minst tre tecken"),
  category: yup
    .string()
    .required("Välj en kategori i listan")
    .oneOf(["Golfset", "Vagn/bag", "Golfklubba", "Golfbil", "Övrigt"])
    .label(["Golfset", "Vagn/bag", "Golfklubba", "Golfbil", "Övrigt"]),
  // image: yup
  //   .string()
  //   .min(8, ({ min }) => `Password must be at least ${min} characters`)
  //   .required("Password is required"),
  description: yup
    .string()
    .max(200, "Beskrivningen får inte vara mer än 200 tecken")
    .required("Fyll i en beskrivning"),
  price: yup.number("Priset måste vara ett nummer").required("Fyll i pris"),
  location: yup
    .string()
    .required("Ange plats")
    .min(3, "Plasten måste vara minst 2 tecken"),
});
