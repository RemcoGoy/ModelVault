import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function LibraryCountComponent() {
    return (
        <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
                <CardDescription>Libraries</CardDescription>
                <CardTitle className="text-4xl">12</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-xs text-muted-foreground">
                    Most recent creation 2024-04-26 12:26
                </div>
            </CardContent>
        </Card>
    )
}