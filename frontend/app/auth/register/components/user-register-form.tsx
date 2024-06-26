"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RegisterFormField from "@/components/FormFields/RegisterFormField"
import { createUser } from "../actions"
import { toast } from "sonner"
import { RegisterFormData as FormData } from "@/types/formfield"
import { useSessionStore } from "@/auth"
import { useRouter } from "next/navigation"
import { AuthResponse } from "@/types/auth"
import { AxiosError } from "axios"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserRegisterForm({ className, ...props }: UserAuthFormProps) {
    const router = useRouter();

    const RegisterSchema = z.object({
        email: z.string().min(1, "Required"),
        username: z.string().min(1, "Required"),
        password: z.string().min(1, "Required"),
        confirmPassword: z.string().min(1, "Required"),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"],
    });

    const setUser = useSessionStore((state) => state.setUser)

    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<FormData>({
        resolver: zodResolver(RegisterSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);

        try {
            const { user, error } = await createUser(data);

            if (user) {
                setUser({
                    email: data.email,
                    username: user.username,
                    accessToken: user.access_token,
                    refreshToken: user.refresh_token,
                    uid: user.uid
                })

                toast("Successfully create a user")
            }

            if (error) {
                toast.error(error)
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
                            Username
                        </Label>
                        <RegisterFormField type="text" placeholder="Username" name="username" error={errors.username} register={register} />
                    </div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <RegisterFormField type="email" placeholder="name@example.com" name="email" error={errors.email} register={register} />
                    </div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="password">
                            Password
                        </Label>
                        <RegisterFormField type="password" placeholder="Password" name="password" error={errors.password} register={register} />
                    </div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="confirmPassword">
                            Confirm password
                        </Label>
                        <RegisterFormField type="password" placeholder="Confirm password" name="confirmPassword" error={errors.confirmPassword} register={register} />
                    </div>
                    <Button disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Sign In with Email
                    </Button>
                </div>
            </form>
            {/* <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <Button variant="outline" type="button" disabled={isLoading}>
                {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Icons.gitHub className="mr-2 h-4 w-4" />
                )}{" "}
                GitHub
            </Button> */}
        </div>
    )
}