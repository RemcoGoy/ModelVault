'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { Library } from "@/types/library"
import { getLibraries } from "@/lib/actions/library"
import { toast } from "sonner"

interface ModelCreateProps {
    onCreate: (name: string, files: FileList | null, library_id: number) => void
    dialogOpen: boolean
    setDialogOpen: (open: boolean) => void
    children: React.ReactNode
}

export default function ModelCreate({ children, onCreate, dialogOpen, setDialogOpen }: ModelCreateProps) {
    const [name, setName] = useState("")
    const [files, setFiles] = useState<FileList | null>(null)
    const [libraryId, setLibraryId] = useState("-1")
    const [libraries, setLibraries] = useState<Library[]>([])

    const fetchLibraries = async () => {
        const { libraries, count, error } = await getLibraries(0, -1);

        if (libraries && count > 0) {
            setLibraries(libraries)
        }

        if (error) {
            toast.error(error)
        }
    }

    useEffect(() => {
        if (dialogOpen === true) {
            fetchLibraries();
        }
    }, [dialogOpen])

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild onClick={() => setDialogOpen(true)}>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create model</DialogTitle>
                    <DialogDescription>
                        Create a new model
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-5 items-center gap-4">
                        <Label htmlFor="name" className="text-right col-span-2">
                            Name
                        </Label>
                        <Input
                            id="name"
                            defaultValue="TestModel"
                            className="col-span-3"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-5 items-center gap-4">
                        <Label htmlFor="files" className="text-right col-span-2">
                            Files
                        </Label>
                        <Input
                            id="files"
                            type="file"
                            multiple={true}
                            className="col-span-3"
                            onChange={(e) => setFiles(e.target.files)}
                        />
                    </div>
                    <div className="grid grid-cols-5 items-center gap-4">
                        <Label htmlFor="library" className="text-right col-span-2">
                            Library
                        </Label>
                        <Select
                            value={libraryId}
                            onValueChange={(e) => setLibraryId(e)}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a library" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Libraries</SelectLabel>
                                    {libraries.map((library) => {
                                        return (
                                            <SelectItem key={library.id} value={library.id.toString()}>{library.name}</SelectItem>
                                        )
                                    })}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => onCreate(name, files, parseInt(libraryId))} type="submit">Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}