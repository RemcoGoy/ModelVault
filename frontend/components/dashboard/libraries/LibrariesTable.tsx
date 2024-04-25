import {
    MoreHorizontal,
} from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Library } from "@/types/library"

export default function LibrariesTable({ libraries }: { libraries: Library[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Path</TableHead>
                    <TableHead className="hidden md:table-cell">
                        Created at
                    </TableHead>
                    <TableHead>
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {libraries.map((library) => {
                    return (
                        <TableRow key={library.id}>
                            <TableCell className="font-medium">
                                {library.id}
                            </TableCell>
                            <TableCell>
                                {library.name}
                            </TableCell>
                            <TableCell>
                                {library.path}
                            </TableCell>
                            <TableCell>
                                {library.created_at.toLocaleString("en-BE")}
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}