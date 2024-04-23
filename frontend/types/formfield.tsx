import { FieldError, UseFormRegister } from "react-hook-form";

export type RegisterFormData = {
    email: string;
    password: string;
    confirmPassword: string;
};

export type RegisterFieldNames = "email" | "password" | "confirmPassword";

export type RegisterFormFieldProps = {
    type: string;
    placeholder: string;
    name: RegisterFieldNames;
    register: UseFormRegister<RegisterFormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
};