'use client'

import { useEffect, useState } from "react"

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
import { toast } from "sonner"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { ListFilter, PlusCircle } from "lucide-react"
import { useModelStore } from "@/lib/stores/models"
import ModelCreate from "@/components/dashboard/models/ModelCreate"
import ModelsTable from "@/components/dashboard/models/ModelsTable"

export default function Models() {
    const setModels = useModelStore((state) => state.setModels)
    const setCount = useModelStore((state) => state.setCount)
    const models = useModelStore((state) => state.models)
    const count = useModelStore((state) => state.count)

    const [createOpen, setCreateOpen] = useState(false)

    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(10)

    const [pages, setPages] = useState([{
        "skip": 0,
        "limit": 10
    }])
    const [activeIndex, setActiveIndes] = useState(0)

    const onCreate = async (): Promise<void> => { }
    const onDelete = async (id: number): Promise<void> => { }

    const refreshModels = async (skip: number = 0, limit: number = 10) => { }

    useEffect(() => {

    }, [count])

    useEffect(() => {
        refreshModels();
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
                        <ModelCreate onCreate={onCreate} dialogOpen={createOpen} setDialogOpen={setCreateOpen}>
                            <Button size="sm" className="h-8 gap-1">
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Add Model
                                </span>
                            </Button>
                        </ModelCreate>
                    </div>
                </div>
                <TabsContent value="all">
                    <Card x-chunk="dashboard-06-chunk-0">
                        <CardHeader>
                            <CardTitle>Models</CardTitle>
                            <CardDescription>
                                Manage your models.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ModelsTable models={models} onDelete={onDelete} />
                        </CardContent>
                        <CardFooter>
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious onClick={() => {
                                            if (activeIndex > 0) {
                                                setSkip(skip - limit)
                                                setActiveIndes(activeIndex - 1)
                                                refreshModels(skip - limit, limit)
                                            }
                                        }} />
                                    </PaginationItem>
                                    {pages.map((page, index) => {
                                        return (
                                            <PaginationItem key={page.skip}>
                                                <PaginationLink onClick={() => {
                                                    setSkip(page.skip)
                                                    setActiveIndes(index)
                                                    refreshModels(page.skip, page.limit)
                                                }} isActive={index == activeIndex}>{index + 1}</PaginationLink>
                                            </PaginationItem>
                                        )
                                    })}
                                    <PaginationItem>
                                        <PaginationNext onClick={() => {
                                            if (activeIndex + 1 < pages.length) {
                                                setSkip(skip + limit)
                                                setActiveIndes(activeIndex + 1)
                                                refreshModels(skip + limit, limit)
                                            }
                                        }} />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                            <div className="text-xs text-muted-foreground w-48">
                                Showing <strong>{skip + 1}-{Math.min(skip + limit, 0)}</strong> of <strong>{0}</strong>{" "}products
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    )
}