import { FieldError, UseFormRegister } from "react-hook-form";

type FormFieldProps = {
    type: string;
    placeholder: string;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
}

// Register

export type RegisterFormData = {
    email: string;
    password: string;
    confirmPassword: string;
};

export type RegisterFieldNames = "email" | "password" | "confirmPassword";

export type RegisterFormFieldProps = FormFieldProps & {
    name: RegisterFieldNames;
    register: UseFormRegister<RegisterFormData>;
};

// Login

export type LoginFormData = {
    email: string;
    password: string;
}

export type LoginFieldNames = "email" | "password";

export type LoginFormFieldProps = FormFieldProps & {
    name: LoginFieldNames;
    register: UseFormRegister<LoginFormData>;
};