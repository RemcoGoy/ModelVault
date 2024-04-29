import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ModelFile } from "@/types/files";
import { Trash2 } from "lucide-react";
import { Canvas } from '@react-three/fiber'
import { FileRender } from "@/components/dashboard/files/FileRender"
import { StlViewer } from "react-stl-viewer";


export default function FileCard({ file, removeFile }: { file: ModelFile, removeFile: (id: number) => void }) {
    const style = {
        top: 0,
        left: 0,
        height: '100%',
        width: '100%'
    }

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/files/${file.id}/download`

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
            <CardContent>
                <StlViewer
                    style={style}
                    orbitControls
                    shadows
                    url={url}
                />
            </CardContent>
        </Card>
    )
}