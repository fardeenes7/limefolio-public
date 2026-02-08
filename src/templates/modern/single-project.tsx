import { PageProps } from "@/lib/template-types";

/**
 * Modern Theme - Single Project Page Component
 * Uses shadcn color variables for consistent theming
 */
export default function ModernSingleProject({ data }: PageProps) {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-6 py-20">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl font-bold text-foreground mb-4">
                        {data?.project?.title || "Project Title"}
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8">
                        {data?.project?.description || "Project description"}
                    </p>
                    <div className="bg-muted rounded-lg p-6 border border-border">
                        <pre className="text-foreground overflow-auto text-sm">
                            {JSON.stringify(data, null, 2)}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
