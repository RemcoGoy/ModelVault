'use client'

import Image from "next/image"
import {
    PlusCircle,
    Upload,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import ModelDetailHeader from "@/components/dashboard/models/ModelDetailHeader"
import { useEffect, useState } from "react"
import { Model } from "@/types/model"
import { getModel } from "@/lib/actions/models"
import { toast } from "sonner"
import ModelDelete from "@/components/dashboard/models/ModelDelete"

export default function ModelDetail({ params }: { params: { model_id: string } }) {
    const [model, setModel] = useState<Model | null>(null)

    useEffect(() => {
        const fetchModel = async () => {
            const { model, error } = await getModel(parseInt(params.model_id))

            if (model) {
                setModel(model)
            }

            if (error) {
                toast.error(error)
            }
        }

        try {
            fetchModel()
        } catch (e: any) {
            toast.error(e)
        }
    }, [params.model_id])


    return (
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                <ModelDetailHeader model={model} />
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                        <Card x-chunk="dashboard-07-chunk-0">
                            <CardHeader>
                                <CardTitle>Model Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            className="w-full"
                                            defaultValue={model?.name}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                        <ModelDelete model={model} />
                    </div>
                </div>
                <div className="flex items-center justify-center gap-2 md:hidden">
                    <Button variant="outline" size="sm">
                        Discard
                    </Button>
                    <Button size="sm">Save Product</Button>
                </div>
            </div>
        </div>
    )
}