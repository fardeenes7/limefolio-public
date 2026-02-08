import { PageProps } from "@/lib/template-types";
import Image from "next/image";

/**
 * Default Theme - Home Page Component
 * Uses shadcn color variables for consistent theming
 */
export default function DefaultHome({ data }: PageProps) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
                <Image
                    className="dark:invert"
                    src="/next.svg"
                    alt="Next.js logo"
                    width={100}
                    height={20}
                    priority
                />
                <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
                    <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-foreground">
                        {data?.title || "Default Theme - Home Page"}
                    </h1>
                    <p className="max-w-md text-lg leading-8 text-muted-foreground">
                        {data?.description ||
                            "This is the default home page template using shadcn colors."}
                    </p>
                </div>
                <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
                    <a
                        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-primary-foreground transition-colors hover:bg-primary/90 md:w-[158px]"
                        href="#"
                    >
                        Get Started
                    </a>
                    <a
                        className="flex h-12 w-full items-center justify-center rounded-full border border-input bg-background px-5 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground md:w-[158px]"
                        href="#"
                    >
                        Learn More
                    </a>
                </div>
            </main>
        </div>
    );
}
