import * as yup from "yup";

export const DonoSchema = yup.object().shape({
  donation: yup.number().required("Required.").positive().integer(),
});
