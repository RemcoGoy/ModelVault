import { Metadata } from "next"

import { UserLoginForm } from "./components/user-login-form"

export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
}

export default function LoginPage() {
    return (
        <UserLoginForm />
    )
}