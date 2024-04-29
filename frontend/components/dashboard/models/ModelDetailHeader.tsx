'use client'

import { Button } from "@/components/ui/button";
import { Model } from "@/types/model";
import { ChevronLeft } from "lucide-react";

export default function ModelDetailHeader({ model }: { model: Model | null }) {
    return (
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                {model?.name}
            </h1>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="sm">
                    Discard
                </Button>
                <Button size="sm">Save Product</Button>
            </div>
        </div>
    )
}