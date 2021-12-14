import * as yup from "yup";

export const FreshProjectSchema = yup.object().shape({
  title: yup.string().required("Required."),
  description: yup
    .string()
    .min(144, `Minimum characters is 144.`)
    .required("Required."),
  category: yup
    .string()
    .oneOf(
      ["Design", "Education", "Fashion", "Medical", "Fine_Arts", "Technology"],
      "Please select from the dropdown"
    )
    .required("Required."),
  image: yup.string().url("Must be a valid URL").required("Required."),
  fundTarget: yup
    .number()
    .min(500, "Minimum amount is $500.")
    .max(
      5000,
      "Please contact support for amounts greater than $5,000. Thank you!"
    )
    .required("Required.")
    .positive("Please enter a positive amount.")
    .integer("Muste be a number."),
  publishDate: yup
    .date()
    .default(() => new Date())
    .required("Required."),
  targetDate: yup.date().required("Required."),
  terms: yup
    .boolean()
    .oneOf([true], "Must Accept Terms and Condition")
    .required("Required."),
});
