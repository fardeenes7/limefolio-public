import { notFound } from "next/navigation";
import { getTemplate, templateExists } from "@/templates";
import { SAMPLE_DATA } from "@/lib/sample-data";
import { getFont, getAllFontVariables } from "@/lib/fonts";
import {
    getColorTheme,
    themeVariablesToCSSProperties,
} from "@/lib/color-themes";
import { ThemeProvider } from "next-themes";
import { themes } from "@/lib/themes";
import type { Metadata } from "next";

interface PreviewPageProps {
    params: Promise<{ template: string }>;
}

export async function generateMetadata({
    params,
}: PreviewPageProps): Promise<Metadata> {
    const { template } = await params;
    if (!templateExists(template)) return {};
    const tmpl = getTemplate(template);
    return {
        title: `${tmpl.name} Template Preview — Limefolio`,
        description: tmpl.description,
    };
}

/**
 * /preview/[template]
 *
 * Renders any registered template with curated sample data so visitors
 * can see a fully populated demo — no domain lookup, no auth required.
 *
 * Uses the "default" colour theme and "outfit" font so the template's
 * own design takes centre stage.
 */
export default async function PreviewPage({ params }: PreviewPageProps) {
    const { template: templateSlug } = await params;

    // Return 404 for unknown template slugs
    if (!templateExists(templateSlug)) {
        notFound();
    }

    const template = getTemplate(templateSlug);

    // Apply a neutral colour theme + font (same defaults as a new site)
    const colorTheme = getColorTheme("default");
    const themeStyles = themeVariablesToCSSProperties(colorTheme.variables);
    const selectedFont = getFont("outfit");
    const allFontVariables = getAllFontVariables();

    return (
        <html
            lang="en"
            className={allFontVariables}
            style={themeStyles as React.CSSProperties}
        >
            <body
                className="antialiased"
                style={{ fontFamily: `var(${selectedFont.variable})` }}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="default"
                    disableTransitionOnChange
                    themes={themes?.map((t) => t.value)}
                >
                    <template.home data={SAMPLE_DATA} />
                </ThemeProvider>
            </body>
        </html>
    );
}
