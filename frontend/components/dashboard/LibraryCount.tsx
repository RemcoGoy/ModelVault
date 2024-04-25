import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function LibraryCountComponent({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
                <CardDescription>This Week</CardDescription>
                <CardTitle className="text-4xl">$1,329</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-xs text-muted-foreground">
                    +25% from last week
                </div>
            </CardContent>
            <CardFooter>
                {children}
            </CardFooter>
        </Card>
    )
}