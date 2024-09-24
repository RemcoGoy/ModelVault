import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Model } from "@/types/model";
import { deleteModel } from "@/lib/actions/models";
import { toast } from "sonner"
import { useRouter } from "next/navigation";

export default function ModelDelete({ model }: { model: Model | null }) {
    const router = useRouter();

    const onDelete = async () => {
        if (model) {
            const deleteId = model.id;

            try {
                const { result, error } = await deleteModel(deleteId);

                if (result) {
                    toast.success("Model deleted successfully");
                    router.push("/dashboard/models")
                }

                if (error) {
                    toast.error(error)
                }
            } catch (err: any) {
                toast.error(err.toString())
            }
        }
    }

    return (
        <Card x-chunk="dashboard-07-chunk-5">
            <CardHeader>
                <CardTitle>Delete Model</CardTitle>
                <CardDescription>
                    This will delete the model and remove all attached files
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div></div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                            Delete Model
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the model
                                and remove any attached files.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardContent>
        </Card>
    )
}