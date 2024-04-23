'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { User } from 'lucide-react';
import { useSessionStore } from "@/auth";
import { logOut } from "@/lib/actions/profile";
import { toast } from "sonner";
import Link from "next/link";

export function ProfileMenu() {
    const user = useSessionStore(state => state.user);
    const setUser = useSessionStore(state => state.setUser);
    const accessToken = useSessionStore(state => state.user?.accessToken);

    const handleLogout = async () => {
        try {
            const result = await logOut(accessToken ?? "");

            if (result.status !== 200) {
                const error: { detail: string } = await result.json();
                toast.error(error.detail);
            } else {
                const resultData = await result.json();
                setUser(null)
                toast("Successfully logged out")
            }
        } catch (error: any) {
            toast.error(error.toString());
        }
    }

    return (
        <>
            {user
                &&
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="overflow-hidden rounded-full"
                        >
                            <User />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                ||
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="overflow-hidden rounded-full"
                        >
                            <User />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href="../auth/login">
                                Login
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Register</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            }
        </>
    )
}