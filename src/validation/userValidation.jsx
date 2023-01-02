import * as yup from "yup";

export const userSchema = yup.object({
    quantity: yup.number().required(),
    price: yup.number().required(),
    description: yup.string('must be a string').required(),
    name: yup.string().required(),
    // images: yup.array().required()
})      