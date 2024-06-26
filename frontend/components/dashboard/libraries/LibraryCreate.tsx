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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface LibraryCreateProps {
    onCreate: (name: string, path: string, tags: string) => void
    dialogOpen: boolean
    setDialogOpen: (open: boolean) => void
    children: React.ReactNode
}

export default function LibraryCreate({ children, onCreate, dialogOpen, setDialogOpen }: LibraryCreateProps) {
    const [name, setName] = useState("");
    const [folderName, setFolderName] = useState("");
    const [tags, setTags] = useState("");

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild onClick={() => setDialogOpen(true)}>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create library</DialogTitle>
                    <DialogDescription>
                        Create a new library to save models to
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-5 items-center gap-4">
                        <Label htmlFor="name" className="text-right col-span-2">
                            Name
                        </Label>
                        <Input
                            id="name"
                            defaultValue="TestLibrary"
                            className="col-span-3"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-5 items-center gap-4">
                        <Label htmlFor="folderName" className="text-right col-span-2">
                            Folder name
                        </Label>
                        <Input
                            id="folderName"
                            defaultValue="test"
                            className="col-span-3"
                            value={folderName}
                            onChange={(e) => setFolderName(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-5 items-center gap-4">
                        <Label htmlFor="tags" className="text-right col-span-2">
                            Tags
                        </Label>
                        <Input
                            id="tags"
                            placeholder="tags,seperated,with,comma"
                            className="col-span-3"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => onCreate(name, folderName, tags)} type="submit">Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}