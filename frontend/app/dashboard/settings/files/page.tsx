import { Separator } from "@/components/ui/separator"
import { FilesForm } from "./files-form"

export default function SettingsAccountPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Files</h3>
                <p className="text-sm text-muted-foreground">
                    Update your file and path settings.
                </p>
            </div>
            <Separator />
            <FilesForm />
        </div>
    )
}