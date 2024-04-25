import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";

export default function UploadFileComponent() {
    return (
        <Card
            className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
        >
            <CardHeader className="pb-3">
                <CardTitle>Upload a new model</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Click here to upload your model.
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Button>Upload model</Button>
            </CardFooter>
        </Card>
    )
}