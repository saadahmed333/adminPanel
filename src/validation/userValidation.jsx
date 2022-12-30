import * as yup from "yup";

export const userSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
    quantity: yup.number().required(),
})