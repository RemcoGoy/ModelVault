'use client'

import { useSessionStore } from "@/auth";
import { UserRegisterForm } from "./components/user-register-form"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function RegisterPage() {
    const user = useSessionStore(state => state.user);
    const userHasHydrated = useSessionStore(state => state._hasHydrated);
    const router = useRouter();

    useEffect(() => {
        if (user && userHasHydrated) {
            toast("You are already logged in!")
            router.push("/dashboard/settings");
        }
    }, [user, userHasHydrated, router]);

    return (
        <UserRegisterForm />
    )
}