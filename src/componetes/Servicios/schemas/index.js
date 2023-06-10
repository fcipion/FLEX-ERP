import * as yup from "yup";

export const formSchema = yup.object().shape({
    cliente: yup
      .string()
      .required("Requerido")
  });