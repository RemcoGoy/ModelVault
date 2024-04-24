'use client'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import { usePathname } from "next/navigation";
import humanizeString from "humanize-string"

export function Breadcrumbs() {
    const pathname = usePathname();

    return (
        // TODO: Make dynamic
        <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
                {pathname.split("/").filter(k => k !== "").map((pathPart, index) => {
                    const splits = pathname.split("/").filter(k => k !== "")
                    const noSplits = splits.length

                    if (noSplits === index + 1) {
                        return (
                            <BreadcrumbItem key={pathPart}>
                                <BreadcrumbPage>{humanizeString(pathPart)}</BreadcrumbPage>
                            </BreadcrumbItem>
                        )
                    } else {
                        return (
                            <>
                                <BreadcrumbItem key={pathPart}>
                                    <BreadcrumbLink asChild>
                                        <Link href={"/" + splits.slice(0, index + 1).join("/")}>{humanizeString(pathPart)}</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                            </>
                        )
                    }
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}