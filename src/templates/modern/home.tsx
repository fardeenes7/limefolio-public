import { PageProps } from "@/lib/template-types";

/**
 * Modern Theme - Home Page Component
 *
 * Uses shadcn color variables with custom styling.
 * This demonstrates how themes can have different layouts
 * while still using the same color system.
 */
export default function ModernHome({ data }: PageProps) {
    return (
        <div className="min-h-screen bg-linear-to-br from-primary via-primary/80 to-accent">
            <div className="container mx-auto px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-6xl font-bold text-primary-foreground mb-6 drop-shadow-lg">
                        {data?.title || "Modern Portfolio"}
                    </h1>
                    <p className="text-2xl text-primary-foreground/90 mb-8">
                        {data?.description ||
                            "A modern, vibrant portfolio theme"}
                    </p>
                    <div className="flex gap-4 justify-center">
                        <button className="px-8 py-3 bg-background text-foreground rounded-full font-semibold hover:bg-background/90 transition-colors shadow-lg">
                            View Projects
                        </button>
                        <button className="px-8 py-3 bg-transparent border-2 border-primary-foreground text-primary-foreground rounded-full font-semibold hover:bg-primary-foreground/10 transition-colors">
                            Contact Me
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
