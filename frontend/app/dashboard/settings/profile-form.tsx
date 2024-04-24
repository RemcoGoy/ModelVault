"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from 'sonner'
import { useSessionStore } from "@/auth"
import { useEffect, useState } from "react"

const profileFormSchema = z.object({
    username: z
        .string()
        .min(1, {
            message: "Username is required.",
        }),
    email: z
        .string({
            required_error: "Please select an email to display.",
        })
        .email()
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileForm() {
    const user = useSessionStore(state => state.user);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: { username: "", email: "" },
        mode: "onChange",
    })

    useEffect(() => {
        if (user) {
            form.setValue("email", user.email)
            form.setValue("username", user.username)
        }
    }, [form, user])

    function onSubmit(data: ProfileFormValues) {
        toast("Settings saved")
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input disabled={true} type="email" placeholder="name@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name. It can be your real name or a
                                pseudonym.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Update profile</Button>
            </form>
        </Form>
    )
}