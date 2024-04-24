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
import React from "react";

export function Breadcrumbs() {
    const pathname = usePathname();

    return (
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
                            <React.Fragment key={pathPart}>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href={"/" + splits.slice(0, index + 1).join("/")}>{humanizeString(pathPart)}</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                            </React.Fragment>
                        )
                    }
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}