import { PageProps } from "@/lib/template-types";
import Image from "next/image";

/**
 * Default Theme - Home Page Component
 * Uses shadcn color variables for consistent theming
 */
export default function MinimalHome({ data }: PageProps) {
    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <main className="flex w-full max-w-3xl mx-auto flex-col py-32 px-16 sm:items-start gap-12">
                <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
                    <h1 className="max-w-xs text-2xl sm:text-3xl font-semibold leading-10 tracking-tight text-foreground">
                        {data?.title || "Minimal Theme - Home Page"}
                    </h1>
                    {data?.description && (
                        <p className="max-w-md text-lg xl:text-xl leading-8 text-muted-foreground">
                            {data?.description}
                        </p>
                    )}
                </div>
                {/* Projects Sections */}
                <div className="flex flex-col gap-2 text-center sm:items-start sm:text-left">
                    <h2 className="max-w-xs text-xl sm:text-2xl font-semibold leading-10 tracking-tight text-foreground">
                        Projects
                    </h2>
                </div>
            </main>
        </div>
    );
}
