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
import { useSessionStore } from "@/auth";
import { logOut } from "@/lib/actions/profile";
import { toast } from "sonner";
import Link from "next/link";
import { User, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";


export function ProfileMenu() {
    const user = useSessionStore(state => state.user);
    const setUser = useSessionStore(state => state.setUser);

    const router = useRouter()

    const { setTheme, theme } = useTheme()

    const handleLogout = async () => {
        try {
            const { result, error } = await logOut();

            if (result) {
                setUser(null)
                toast("Successfully logged out")

                router.push('/auth/login')
            }

            if (error) {
                toast.error(error);
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
                        <DropdownMenuLabel>
                            My Account
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href="/dashboard/settings">
                            <DropdownMenuItem>
                                Settings
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                            <Sun className="h-6 w-[1.3rem] dark:hidden" />
                            <Moon className="hidden size-5 dark:block" />
                            <span className="ml-1">Toggle theme</span>
                        </DropdownMenuItem>
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
                        <DropdownMenuItem onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                            <Sun className="h-6 w-[1.3rem] dark:hidden" />
                            <Moon className="hidden size-5 dark:block" />
                            <span className="ml-1">Toggle theme</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <Link href="/auth/login">
                            <DropdownMenuItem>
                                Login
                            </DropdownMenuItem>
                        </Link>
                        <Link href="auth/register">
                            <DropdownMenuItem>
                                Register
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            }
        </>
    )
}