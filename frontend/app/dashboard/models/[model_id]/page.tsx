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
                                <CardTitle>Product Details</CardTitle>
                                <CardDescription>
                                    Lipsum dolor sit amet, consectetur adipiscing elit
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            className="w-full"
                                            defaultValue="Gamer Gear Pro Controller"
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                                            className="min-h-32"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card x-chunk="dashboard-07-chunk-1">
                            <CardHeader>
                                <CardTitle>Stock</CardTitle>
                                <CardDescription>
                                    Lipsum dolor sit amet, consectetur adipiscing elit
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">SKU</TableHead>
                                            <TableHead>Stock</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead className="w-[100px]">Size</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-semibold">
                                                GGPC-001
                                            </TableCell>
                                            <TableCell>
                                                <Label htmlFor="stock-1" className="sr-only">
                                                    Stock
                                                </Label>
                                                <Input
                                                    id="stock-1"
                                                    type="number"
                                                    defaultValue="100"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Label htmlFor="price-1" className="sr-only">
                                                    Price
                                                </Label>
                                                <Input
                                                    id="price-1"
                                                    type="number"
                                                    defaultValue="99.99"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <ToggleGroup
                                                    type="single"
                                                    defaultValue="s"
                                                    variant="outline"
                                                >
                                                    <ToggleGroupItem value="s">S</ToggleGroupItem>
                                                    <ToggleGroupItem value="m">M</ToggleGroupItem>
                                                    <ToggleGroupItem value="l">L</ToggleGroupItem>
                                                </ToggleGroup>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-semibold">
                                                GGPC-002
                                            </TableCell>
                                            <TableCell>
                                                <Label htmlFor="stock-2" className="sr-only">
                                                    Stock
                                                </Label>
                                                <Input
                                                    id="stock-2"
                                                    type="number"
                                                    defaultValue="143"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Label htmlFor="price-2" className="sr-only">
                                                    Price
                                                </Label>
                                                <Input
                                                    id="price-2"
                                                    type="number"
                                                    defaultValue="99.99"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <ToggleGroup
                                                    type="single"
                                                    defaultValue="m"
                                                    variant="outline"
                                                >
                                                    <ToggleGroupItem value="s">S</ToggleGroupItem>
                                                    <ToggleGroupItem value="m">M</ToggleGroupItem>
                                                    <ToggleGroupItem value="l">L</ToggleGroupItem>
                                                </ToggleGroup>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-semibold">
                                                GGPC-003
                                            </TableCell>
                                            <TableCell>
                                                <Label htmlFor="stock-3" className="sr-only">
                                                    Stock
                                                </Label>
                                                <Input
                                                    id="stock-3"
                                                    type="number"
                                                    defaultValue="32"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Label htmlFor="price-3" className="sr-only">
                                                    Stock
                                                </Label>
                                                <Input
                                                    id="price-3"
                                                    type="number"
                                                    defaultValue="99.99"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <ToggleGroup
                                                    type="single"
                                                    defaultValue="s"
                                                    variant="outline"
                                                >
                                                    <ToggleGroupItem value="s">S</ToggleGroupItem>
                                                    <ToggleGroupItem value="m">M</ToggleGroupItem>
                                                    <ToggleGroupItem value="l">L</ToggleGroupItem>
                                                </ToggleGroup>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                            <CardFooter className="justify-center border-t p-4">
                                <Button size="sm" variant="ghost" className="gap-1">
                                    <PlusCircle className="h-3.5 w-3.5" />
                                    Add Variant
                                </Button>
                            </CardFooter>
                        </Card>
                        <Card x-chunk="dashboard-07-chunk-2">
                            <CardHeader>
                                <CardTitle>Product Category</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 sm:grid-cols-3">
                                    <div className="grid gap-3">
                                        <Label htmlFor="category">Category</Label>
                                        <Select>
                                            <SelectTrigger
                                                id="category"
                                                aria-label="Select category"
                                            >
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="clothing">Clothing</SelectItem>
                                                <SelectItem value="electronics">
                                                    Electronics
                                                </SelectItem>
                                                <SelectItem value="accessories">
                                                    Accessories
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="subcategory">
                                            Subcategory (optional)
                                        </Label>
                                        <Select>
                                            <SelectTrigger
                                                id="subcategory"
                                                aria-label="Select subcategory"
                                            >
                                                <SelectValue placeholder="Select subcategory" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="t-shirts">T-Shirts</SelectItem>
                                                <SelectItem value="hoodies">Hoodies</SelectItem>
                                                <SelectItem value="sweatshirts">
                                                    Sweatshirts
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                        <Card x-chunk="dashboard-07-chunk-3">
                            <CardHeader>
                                <CardTitle>Product Status</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="status">Status</Label>
                                        <Select>
                                            <SelectTrigger id="status" aria-label="Select status">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="draft">Draft</SelectItem>
                                                <SelectItem value="published">Active</SelectItem>
                                                <SelectItem value="archived">Archived</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card
                            className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
                        >
                            <CardHeader>
                                <CardTitle>Product Images</CardTitle>
                                <CardDescription>
                                    Lipsum dolor sit amet, consectetur adipiscing elit
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-2">
                                    <Image
                                        alt="Product image"
                                        className="aspect-square w-full rounded-md object-cover"
                                        height="300"
                                        src="/placeholder.svg"
                                        width="300"
                                    />
                                    <div className="grid grid-cols-3 gap-2">
                                        <button>
                                            <Image
                                                alt="Product image"
                                                className="aspect-square w-full rounded-md object-cover"
                                                height="84"
                                                src="/placeholder.svg"
                                                width="84"
                                            />
                                        </button>
                                        <button>
                                            <Image
                                                alt="Product image"
                                                className="aspect-square w-full rounded-md object-cover"
                                                height="84"
                                                src="/placeholder.svg"
                                                width="84"
                                            />
                                        </button>
                                        <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                                            <Upload className="h-4 w-4 text-muted-foreground" />
                                            <span className="sr-only">Upload</span>
                                        </button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card x-chunk="dashboard-07-chunk-5">
                            <CardHeader>
                                <CardTitle>Archive Product</CardTitle>
                                <CardDescription>
                                    Lipsum dolor sit amet, consectetur adipiscing elit.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div></div>
                                <Button size="sm" variant="secondary">
                                    Archive Product
                                </Button>
                            </CardContent>
                        </Card>
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