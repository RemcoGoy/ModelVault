import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ModelCountComponent({ loading, count }: { loading: boolean, count: number }) {
    return (
        <Card x-chunk="dashboard-05-chunk-2">
            <CardHeader className="pb-2">
                <CardDescription>Models</CardDescription>
                {loading ? <Skeleton className="h-10 w-[50px]" /> : <CardTitle className="text-4xl">{count}</CardTitle>}
            </CardHeader>
            <CardContent>
                <div className="text-xs text-muted-foreground">
                    Most recent upload 2024-04-26 12:26
                </div>
            </CardContent>
        </Card>
    )
}