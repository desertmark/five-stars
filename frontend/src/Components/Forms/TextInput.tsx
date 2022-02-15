import React, { FC } from "react";
import { FormikProps } from 'formik';
import {
    TextField, TextFieldProps,
} from "@mui/material";


export interface BaseInput<Values> {
    formik: FormikProps<Values>;
    name: string;
}
export type TextInputProps = BaseInput<any> & TextFieldProps;

export const TextInput: FC<TextInputProps> = ({ formik, name, ...props }) => {
    return <TextField
        variant="outlined"
        sx={{ mt: 4 }}
        onChange={(e) => formik.setFieldValue(name, e.target.value)}
        {...props}
    />
}