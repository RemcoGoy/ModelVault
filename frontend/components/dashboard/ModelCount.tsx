import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ModelCountComponent({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Card x-chunk="dashboard-05-chunk-2">
            <CardHeader className="pb-2">
                <CardDescription>This Month</CardDescription>
                <CardTitle className="text-4xl">$5,329</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-xs text-muted-foreground">
                    +10% from last month
                </div>
            </CardContent>
            <CardFooter>
                {children}
            </CardFooter>
        </Card>
    )
}