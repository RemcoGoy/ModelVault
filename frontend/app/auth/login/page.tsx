'use client'

import { UserLoginForm } from "./components/user-login-form"
import { useEffect } from "react";
import { useSessionStore } from "@/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
    const user = useSessionStore(state => state.user);
    const userHasHydrated = useSessionStore(state => state._hasHydrated);
    const router = useRouter();

    useEffect(() => {
        if (user && userHasHydrated) {
            router.push("/dashboard/settings");
        }
    }, [user, userHasHydrated, router]);

    return (
        <UserLoginForm />
    )
}