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
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

export default function LibrariesTable({ libraries, onDelete }: { libraries: Library[], onDelete: (id: number) => void }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Path</TableHead>
                    <TableHead>Tags</TableHead>
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
                                {library.tags.map(tag => {
                                    return (
                                        <Badge key={tag} variant="outline">{tag}</Badge>
                                    )
                                })}
                            </TableCell>
                            <TableCell>
                                {library.created_at.toLocaleString("en-BE")}
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            aria-haspopup="true"
                                            size="icon"
                                            variant="ghost"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => onDelete(library.id)}>Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}