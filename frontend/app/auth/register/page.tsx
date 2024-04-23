import { Metadata } from "next"

import { UserRegisterForm } from "./components/user-register-form"

export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
}

export default function RegisterPage() {
    return (
        <UserRegisterForm />
    )
}