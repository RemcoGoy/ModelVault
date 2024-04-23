'use client'

import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();

    const [formTitle, setFormTitle] = useState("")
    const [formSubtitle, setFormSubtitle] = useState("")
    const [redirect, setRedirect] = useState<{ path: string, text: string }>(
        { path: "", text: "" }
    )

    useEffect(() => {
        switch (pathname) {
            case "/auth/login":
                setFormTitle("Log in to your account")
                setFormSubtitle("Enter your credentials below to log in")
                setRedirect({ path: "/auth/register", text: "Create account" })
                break;
            case "/auth/register":
                setFormTitle("Create an account")
                setFormSubtitle("Enter your email below to create your account")
                setRedirect({ path: "/auth/login", text: "Login" })
                break;
            default:
                break;
        }
    }, [pathname])

    return (
        <>
            <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Link
                    href={redirect.path}
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute right-4 top-4 md:right-8 md:top-8"
                    )}
                >
                    {redirect.text}
                </Link>
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-6 w-6"
                        >
                            <path xmlns="http://www.w3.org/2000/svg" d="M2 7.75C2 5.67893 3.67893 4 5.75 4H18.25C20.3211 4 22 5.67893 22 7.75V16.25C22 18.3211 20.3211 20 18.25 20H5.75C3.67893 20 2 18.3211 2 16.25V7.75ZM5.75 7C5.33579 7 5 7.33579 5 7.75V16.25C5 16.6642 5.33579 17 5.75 17C6.16421 17 6.5 16.6642 6.5 16.25V7.75C6.5 7.33579 6.16421 7 5.75 7ZM11.2803 8.21967C10.9874 7.92678 10.5126 7.92678 10.2197 8.21967C9.92678 8.51256 9.92678 8.98744 10.2197 9.28033L11.4154 10.476C11.1514 10.9227 11 11.4436 11 12C11 12.5564 11.1514 13.0773 11.4154 13.524L10.2197 14.7197C9.92678 15.0126 9.92678 15.4874 10.2197 15.7803C10.5126 16.0732 10.9874 16.0732 11.2803 15.7803L12.476 14.5846C12.9227 14.8486 13.4436 15 14 15C14.5564 15 15.0773 14.8486 15.524 14.5846L16.7197 15.7803C17.0126 16.0732 17.4874 16.0732 17.7803 15.7803C18.0732 15.4874 18.0732 15.0126 17.7803 14.7197L16.5846 13.524C16.8486 13.0773 17 12.5564 17 12C17 11.4436 16.8486 10.9227 16.5846 10.476L17.7803 9.28033C18.0732 8.98744 18.0732 8.51256 17.7803 8.21967C17.4874 7.92678 17.0126 7.92678 16.7197 8.21967L15.524 9.41536C15.0773 9.15145 14.5564 9 14 9C13.4436 9 12.9227 9.15145 12.476 9.41536L11.2803 8.21967Z" fill="#212121" />
                        </svg>
                        Model Vault
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra bibendum nisi, nec fermentum ligula finibus ac.&rdquo;
                            </p>
                            <footer className="text-sm">Anonymous</footer>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {formTitle}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {formSubtitle}
                            </p>
                        </div>
                        {children}
                        {/* <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree to our{" "}
                            <Link
                                href="/terms"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                                href="/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p> */}
                    </div>
                </div>
            </div>
        </>
    )
}