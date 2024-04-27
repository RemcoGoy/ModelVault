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

interface ModelCreateProps {
    onCreate: (name: string, path: string, tags: string) => void
    dialogOpen: boolean
    setDialogOpen: (open: boolean) => void
    children: React.ReactNode
}

export default function ModelCreate({ children, onCreate, dialogOpen, setDialogOpen }: ModelCreateProps) {
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
                </div>
                <DialogFooter>
                    <Button onClick={() => onCreate(name, folderName, tags)} type="submit">Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}