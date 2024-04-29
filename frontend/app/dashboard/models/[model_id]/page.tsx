'use client'


import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ModelDetailHeader from "@/components/dashboard/models/ModelDetailHeader"
import { useEffect, useState } from "react"
import { Model } from "@/types/model"
import { createFile, getModel, updateModel } from "@/lib/actions/models"
import { toast } from "sonner"
import ModelDelete from "@/components/dashboard/models/ModelDelete"
import { Library } from "@/types/library"
import { getLibrary } from "@/lib/actions/library"
import { ModelFile } from "@/types/files"
import { Trash2 } from "lucide-react"
import { deleteFile } from "@/lib/actions/files"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

export default function ModelDetail({ params }: { params: { model_id: string } }) {
    const [model, setModel] = useState<Model | null>(null)
    const [library, setLibrary] = useState<Library | null>(null)

    const [name, setName] = useState("")

    const fetchLibrary = async (library_id: number) => {
        try {
            const { library, error } = await getLibrary(library_id);

            if (library) {
                setLibrary(library)
            }

            if (error) {
                toast.error(error)
            }
        } catch (err: any) {
            toast.error(err)
        }
    }

    const fetchModel = async (model_id: number) => {
        const { model, error } = await getModel(model_id)

        if (model) {
            setModel(model)
            setName(model.name)

            fetchLibrary(model.library_id)
        }

        if (error) {
            toast.error(error)
        }
    }

    useEffect(() => {
        try {
            fetchModel(parseInt(params.model_id))
        } catch (e: any) {
            toast.error(e)
        }
    }, [params.model_id])

    const addFiles = async (files: FileList | null) => {
        if (files) {
            try {
                const file_upload_error = [];
                for (let i = 0; i < files.length; i++) {
                    const currentFile = files.item(i)

                    if (currentFile) {
                        const { file, error } = await createFile(currentFile.name, parseInt(params.model_id))

                        if (file) {
                            // Upload file
                            const fd = new FormData()
                            fd.append('file_upload', currentFile)
                            const result = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/files/${file.id}/upload/`, {
                                method: 'POST',
                                body: fd,
                            })

                            if (result.status !== 200) {
                                const err = result.json();

                                file_upload_error.push(err)
                            }
                        }

                        if (error) {
                            file_upload_error.push(error)
                        }
                    }
                }

                if (file_upload_error.length > 0) {
                    toast.error(file_upload_error[0])
                } else {
                    fetchModel(parseInt(params.model_id))
                    toast("Files uploaded!")
                }
            } catch (e: any) {
                toast.error(e)
            }
        }
    }

    const onSave = async () => {
        try {
            const { model, error } = await updateModel(parseInt(params.model_id), { name });

            if (model) {
                setModel(model)
                setName(model.name)

                toast("Model updated!")
            }

            if (error) {
                toast.error(error)
            }
        } catch (e: any) {
            toast.error(e)
        }
    }

    const removeFile = async (file_id: number) => {
        try {
            const { result, error } = await deleteFile(file_id)

            if (result) {
                fetchModel(parseInt(params.model_id))
                toast("File deleted!")
            }

            if (error) {
                toast.error(error)
            }
        } catch (err: any) {
            toast.error(err)
        }
    }

    return (
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                <ModelDetailHeader model={model} onSave={onSave} />
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                        <Card x-chunk="dashboard-07-chunk-0">
                            <CardHeader>
                                <CardTitle>Model Details</CardTitle>
                                <CardDescription>
                                    Created at {model?.created_at.toLocaleDateString('en-BE')} {model?.created_at.toLocaleTimeString('en-BE')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            className="w-full"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="library">Library</Label>
                                        <Input
                                            id="library"
                                            type="text"
                                            className="w-full"
                                            value={library?.name}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <div className="grid auto-rows-max items-start gap-4 md:grid-cols-2">
                            {model && model.files.map((file: ModelFile) => {
                                return (
                                    <Card key={file.id}>
                                        <CardHeader>
                                            <div className="grid grid-cols-6">
                                                <h5 className="col-span-5 text-ellipsis">{file.file_name}</h5>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="outline" size="icon">
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will permanently delete the file.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => removeFile(file.id)}>Continue</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>


                                        </CardHeader>
                                        <CardContent></CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>
                    <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                        <ModelDelete model={model} />
                        <Card>
                            <CardHeader>
                                <CardTitle>Add more files</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Input
                                            id="name"
                                            type="file"
                                            multiple={true}
                                            className="w-full"
                                            onChange={(e) => addFiles(e.target.files)}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-2 md:hidden">
                    <Button variant="outline" size="sm">
                        Discard
                    </Button>
                    <Button onClick={onSave} size="sm">Save Model</Button>
                </div>
            </div>
        </div>
    )
}