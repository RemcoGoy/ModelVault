import "./globals.css";
import { cn } from "@/lib/utils"
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner"
import { Sidebar } from "@/components/sidebar";
import { Providers } from "@/components/providers";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SheetMenu } from "@/components/sheetmenu";
import { SearchComponent } from "@/components/search";
import { ProfileMenu } from "@/components/profilemenu";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable, inter.className)}>
        <Toaster position="top-center" closeButton />
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <Sidebar />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
              <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <SheetMenu />
                <Breadcrumbs />
                <SearchComponent />
                <ProfileMenu />
              </header>
              <main>
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
