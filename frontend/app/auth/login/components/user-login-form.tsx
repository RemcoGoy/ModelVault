"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import LoginFormField from "@/components/FormFields/LoginFormField"
import { toast } from 'sonner'
import { logIn } from "../actions"
import { LoginFormData as FormData } from "@/types/formfield"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserLoginForm({ className, ...props }: UserAuthFormProps) {
    const LoginSchema = z.object({
        email: z.string().min(1, "Required"),
        password: z.string().min(1, "Required"),
    });

    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<FormData>({
        resolver: zodResolver(LoginSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);

        try {
            const result = await logIn(data);

            if (result.status !== 200) {
                const error = await result.json();
                toast.error(error.detail);
            } else {
                toast("Successfully logged in")
            }
        } catch (error: any) {
            toast.error(error.toString());
        }

        setIsLoading(false);
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <LoginFormField type="email" placeholder="name@example.com" name="email" error={errors.email} register={register} />
                    </div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="password">
                            Password
                        </Label>
                        <LoginFormField type="password" placeholder="Password" name="password" error={errors.password} register={register} />
                    </div>
                    <Button disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Log in
                    </Button>
                </div>
            </form>
        </div>
    )
}