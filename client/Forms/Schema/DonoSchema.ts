import * as yup from "yup";

export const DonoSchema = yup.object().shape({
  donation: yup
    .number()
    .required("Required.")
    .positive("Must be positive value.")
    .integer("Must be number"),
});
