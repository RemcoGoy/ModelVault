'use client'

import Link from "next/link";
import {
    Home,
    Settings,
    Vault,
    Library,
    FileBox
} from "lucide-react"

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { usePathname } from "next/navigation";

const sidebarItems = [
    {
        "title": "Dashboard",
        "path": "/dashboard",
        "icon": <Home className="h-5 w-5" />
    },
    {
        "title": "Libraries",
        "path": "/dashboard/libraries",
        "icon": <Library className="h-5 w-5" />
    },
    {
        "title": "Models",
        "path": "/dashboard/models",
        "icon": <FileBox className="h-5 w-5" />
    }
]

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <Link
                    href="/dashboard"
                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                    <Vault className="h-4 w-4 transition-all group-hover:scale-110" />
                    <span className="sr-only">Model Vault</span>
                </Link>
                {
                    sidebarItems.map(item => {
                        return (
                            <Tooltip key={item.path}>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={item.path}
                                        className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${item.path === pathname ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
                                    >
                                        {item.icon}
                                        <span className="sr-only">{item.title}</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">{item.title}</TooltipContent>
                            </Tooltip>
                        )
                    })
                }
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/dashboard/settings"
                            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${pathname === "/dashboard/settings" ? "bg-accent text-accent-foreground" : "text-muted-foreground "}`}
                        >
                            <Settings className="h-5 w-5" />
                            <span className="sr-only">Settings</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Settings</TooltipContent>
                </Tooltip>
            </nav>
        </aside>
    )
}