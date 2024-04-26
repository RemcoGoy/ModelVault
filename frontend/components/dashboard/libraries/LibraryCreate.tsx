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
import { createLibrary } from "@/lib/actions/library"
import { useState } from "react"
import { toast } from 'sonner';

interface LibraryCreateProps {
    onCreate: (name: string, path: string, tags: string) => void
    dialogOpen: boolean
    setDialogOpen: (open: boolean) => void
    children: React.ReactNode
}

export default function LibraryCreate({ children, onCreate, dialogOpen, setDialogOpen }: LibraryCreateProps) {
    const [name, setName] = useState("");
    const [path, setPath] = useState("");
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
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
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
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="path" className="text-right">
                            Path
                        </Label>
                        <Input
                            id="path"
                            defaultValue="/test"
                            className="col-span-3"
                            value={path}
                            onChange={(e) => setPath(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="tags" className="text-right">
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
                    <Button onClick={() => onCreate(name, path, tags)} type="submit">Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}