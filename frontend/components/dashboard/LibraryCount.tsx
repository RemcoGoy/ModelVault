import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LibraryCountComponent({ loading, count, mostRecent }: { loading: boolean, count: number, mostRecent: Date }) {
    return (
        <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
                <CardDescription>Libraries</CardDescription>
                {loading ? <Skeleton className="h-10 w-[50px]" /> : <CardTitle className="text-4xl">{count}</CardTitle>}
            </CardHeader>
            <CardContent>
                {
                    loading
                        ?
                        <Skeleton className="h-3 w-[150px]" />
                        :
                        <div className="text-xs text-muted-foreground">
                            Most recent upload {mostRecent.toLocaleDateString('en-BE')} {mostRecent.toLocaleTimeString('en-BE')}
                        </div>
                }
            </CardContent>
        </Card>
    )
}