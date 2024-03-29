import * as yup from "yup";

export interface IProjectForm {
  title: string;
  description: string;
  category: string;
  image: string;
  fundTarget: string;
  publishDate: string;
  targetDate: string;
  terms: boolean;
}

export const projectCategories = [
  { label: "Design", value: "Design" },
  { label: "Education", value: "Education" },
  { label: "Fashion", value: "Fashion" },
  { label: "Fine Arts", value: "Fine_Arts" },
  { label: "Medical", value: "Medical" },
  { label: "Technology", value: "Technology" },
];

export const ProjectSchema = yup.object().shape({
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
  fundTarget: yup.string().required("Required."),
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
