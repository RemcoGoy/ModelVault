'use client'

import {
    ListFilter,
    PlusCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import LibrariesTable from "@/components/dashboard/libraries/LibrariesTable"
import LibraryCreate from "@/components/dashboard/libraries/LibraryCreate"
import { useLibraryStore } from "@/lib/stores/libraries"
import { useEffect, useState } from "react"
import { getLibraries } from "@/lib/actions/library"
import { toast } from "sonner"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

export default function Libraries() {
    const setLibraries = useLibraryStore((state) => state.setLibraries)
    const setCount = useLibraryStore((state) => state.setCount)
    const libraries = useLibraryStore((state) => state.libraries)
    const count = useLibraryStore((state) => state.count)

    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(10)

    const [pages, setPages] = useState([{
        "skip": 0,
        "limit": 10
    }])
    const [activeIndex, setActiveIndes] = useState(0)

    const refreshLibraries = async (skip: number = 0, limit: number = 10) => {
        const { libraries, count, error } = await getLibraries(skip, limit);

        if (libraries && count > 0) {
            setLibraries(libraries)
            setCount(count)
        }

        if (error) {
            toast.error(error)
        }
    }

    useEffect(() => {
        const pages = []
        for (let i = 0; i < count; i += 10) {
            pages.push({
                "skip": i,
                "limit": 10
            })
        }
        setPages(pages)
    }, [count])

    useEffect(() => {
        refreshLibraries();
    }, [])

    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                    </TabsList>
                    <div className="ml-auto flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8 gap-1">
                                    <ListFilter className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Filter
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem checked>
                                    Active
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Archived
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <LibraryCreate>
                            <Button size="sm" className="h-8 gap-1">
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Add Library
                                </span>
                            </Button>
                        </LibraryCreate>
                    </div>
                </div>
                <TabsContent value="all">
                    <Card x-chunk="dashboard-06-chunk-0">
                        <CardHeader>
                            <CardTitle>Libraries</CardTitle>
                            <CardDescription>
                                Manage your libraries.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <LibrariesTable libraries={libraries} />
                        </CardContent>
                        <CardFooter>
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious onClick={() => {
                                            if (activeIndex > 0) {
                                                setSkip(skip - limit)
                                                setActiveIndes(activeIndex - 1)
                                                refreshLibraries(skip - limit, limit)
                                            }
                                        }} />
                                    </PaginationItem>
                                    {pages.map((page, index) => {
                                        return (
                                            <PaginationItem key={page.skip}>
                                                <PaginationLink onClick={() => {
                                                    setSkip(page.skip)
                                                    setActiveIndes(index)
                                                    refreshLibraries(page.skip, page.limit)
                                                }} isActive={index == activeIndex}>{index + 1}</PaginationLink>
                                            </PaginationItem>
                                        )
                                    })}
                                    <PaginationItem>
                                        <PaginationNext onClick={() => {
                                            if (activeIndex + 1 < pages.length) {
                                                setSkip(skip + limit)
                                                setActiveIndes(activeIndex + 1)
                                                refreshLibraries(skip + limit, limit)
                                            }
                                        }} />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                            <div className="text-xs text-muted-foreground w-48">
                                Showing <strong>{skip + 1}-{Math.min(skip + limit, count)}</strong> of <strong>{count}</strong>{" "}products
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    )
}
