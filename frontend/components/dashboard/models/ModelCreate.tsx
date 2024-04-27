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
import { useState } from "react"

interface ModelCreateProps {
    onCreate: (name: string, file_name: string, library_id: number) => void
    dialogOpen: boolean
    setDialogOpen: (open: boolean) => void
    children: React.ReactNode
}

export default function ModelCreate({ children, onCreate, dialogOpen, setDialogOpen }: ModelCreateProps) {
    const [name, setName] = useState("")
    const [fileName, setFileName] = useState("")
    const [libraryId, setLibraryId] = useState(-1)

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
                        <Label htmlFor="name" className="text-right col-span-2">
                            File
                        </Label>
                        <Input
                            id="name"
                            type="file"
                            defaultValue="TestModel"
                            className="col-span-3"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-5 items-center gap-4">
                        <Label htmlFor="name" className="text-right col-span-2">
                            Library
                        </Label>
                        <Select>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a fruit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Fruits</SelectLabel>
                                    <SelectItem value="apple">Apple</SelectItem>
                                    <SelectItem value="banana">Banana</SelectItem>
                                    <SelectItem value="blueberry">Blueberry</SelectItem>
                                    <SelectItem value="grapes">Grapes</SelectItem>
                                    <SelectItem value="pineapple">Pineapple</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {/* <Input
                            id="name"
                            defaultValue="TestModel"
                            className="col-span-3"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        /> */}
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => onCreate(name, fileName, libraryId)} type="submit">Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}