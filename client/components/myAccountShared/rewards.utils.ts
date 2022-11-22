import range from "lodash/range";
import * as yup from "yup";

export const months = [
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
];

export const years = range(
  new Date().getFullYear(),
  new Date(new Date().setFullYear(2050)).getFullYear(),
  1
).map((year) => ({ value: year.toString(), label: year.toString() }));

export const RewardSchema = yup.object({
  description: yup.string().required("Required"),
  amount: yup.string().required("Required"),
  image: yup.string().required("Required"),
  quantityRemaining: yup.string().required("Required"),
  deliveredByMonth: yup.date().required("Required"),
  deliveredByYear: yup.date().required("Required"),
});

export interface IFormData {
  amount: string;
  image: string;
  description: string;
  deliveredByMonth: string;
  deliveredByYear: string;
  quantityRemaining: string;
}
