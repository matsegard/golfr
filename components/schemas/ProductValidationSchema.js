import * as yup from "yup";

export const ProductValidationSchema = yup.object().shape({
  title: yup
    .string()
    .required("Fyll i en titel")
    .max(25, "Titel får inte vara mer än 25 tecken")
    .min(3, "Titeln måste vara minst tre tecken"),
  category: yup
    .string()
    .required("Välj kategori")
    .oneOf(["Golfset", "Vagn/bag", "Golfklubba", "Golfbil", "Övrigt"])
    .label(["Golfset", "Vagn/bag", "Golfklubba", "Golfbil", "Övrigt"]),
  description: yup
    .string()
    .max(150, "Beskrivningen får inte vara mer än 150 tecken")
    .required("Fyll i en beskrivning"),
  price: yup
    .number()
    .max(100000, "Priset får endast innehålla 5 siffror")
    .typeError("Priset måste vara ett nummer")
    .required("Fyll i pris"),
  location: yup
    .string()
    .required("Ange plats")
    .max(30, "Platsen får inte vara mer än 30 tecken")
    .min(3, "Plasten måste vara minst 2 tecken"),
  clubs: yup
    .string()
    // .required("Ange vilka klubbor settet innehåller")
    .max(45, "Klubbor får inte vara mer än 45 tecken")
    .min(3, "Ange vilka klubbor settet innehåller"),
  difficulty: yup
    .string()
    .oneOf(["Avancerad", "Medel", "Nybörjare"])
    .label(["Avancerad", "Medel", "Nybörjare"]),
  gender: yup
    .string()
    // .required("Välj kön")
    .oneOf(["Herr", "Dam", "Unisex"])
    .label(["Herr", "Dam", "Unisex"]),
  hand: yup
    .string()
    // .required("Välj fattning")
    .oneOf(["Höger", "Vänster"])
    .label(["Höger", "Vänster"]),
  shaft: yup
    .string()
    .optional()
    .oneOf(["Lady", "Senior", "Regular", "Stiff", "X-Stiff"])
    .label(["Lady", "Senior", "Regular", "Stiff", "X-Stiff"]),
  level: yup
    .string()
    .oneOf(["Avancerad", "Medel", "Nybörjare"])
    .label(["Avancerad", "Medel", "Nybörjare"]),
});
