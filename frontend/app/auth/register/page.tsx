'use client'

import { useSessionStore } from "@/auth";
import { UserRegisterForm } from "./components/user-register-form"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RegisterPage() {
    const user = useSessionStore(state => state.user);
    const userHasHydrated = useSessionStore(state => state._hasHydrated);
    const router = useRouter();

    useEffect(() => {
        if (user && userHasHydrated) {
            router.push("/dashboard/settings");
        }
    }, [user, userHasHydrated, router]);

    return (
        <UserRegisterForm />
    )
}