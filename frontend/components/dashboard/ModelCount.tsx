import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ModelCountComponent() {
    return (
        <Card x-chunk="dashboard-05-chunk-2">
            <CardHeader className="pb-2">
                <CardDescription>Models</CardDescription>
                <CardTitle className="text-4xl">45</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-xs text-muted-foreground">
                    Most recent upload 2024-04-26 12:26
                </div>
            </CardContent>
        </Card>
    )
}