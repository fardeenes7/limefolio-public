import { Figtree, Geist, Geist_Mono } from "next/font/google";

/**
 * Font configuration interface
 */
export interface FontConfig {
    name: string;
    slug: string;
    variable: string;
    font: any; // Next.js font object
}

/**
 * Font Registry
 * Configure all available fonts here
 */

// Figtree font
const figtree = Figtree({
    subsets: ["latin"],
    variable: "--font-figtree",
});

// Geist Sans font
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

// Geist Mono font
const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

/**
 * Fonts Registry
 * Maps font slugs to their configurations
 */
export const Fonts: Record<string, FontConfig> = {
    figtree: {
        name: "Figtree",
        slug: "figtree",
        variable: "--font-figtree",
        font: figtree,
    },
    "geist-sans": {
        name: "Geist Sans",
        slug: "geist-sans",
        variable: "--font-geist-sans",
        font: geistSans,
    },
    "geist-mono": {
        name: "Geist Mono",
        slug: "geist-mono",
        variable: "--font-geist-mono",
        font: geistMono,
    },
};

/**
 * Get font configuration by slug
 * Falls back to figtree if font not found
 */
export function getFont(fontSlug: string | undefined | null): FontConfig {
    if (!fontSlug || !Fonts[fontSlug]) {
        if (fontSlug && !Fonts[fontSlug]) {
            console.warn(
                `Font "${fontSlug}" not found. Falling back to figtree.`,
            );
        }
        return Fonts.figtree;
    }
    return Fonts[fontSlug];
}

/**
 * Get all available font slugs
 */
export function getAvailableFonts(): string[] {
    return Object.keys(Fonts);
}

/**
 * Get metadata for all available fonts
 */
export function getFontMetadata() {
    return Object.entries(Fonts).map(([slug, config]) => ({
        name: config.name,
        slug: config.slug,
        variable: config.variable,
    }));
}

/**
 * Get all font variables as a string for className
 */
export function getAllFontVariables(): string {
    return Object.values(Fonts)
        .map((config) => config.font.variable)
        .join(" ");
}

/**
 * Get font className for a specific font
 */
export function getFontClassName(fontSlug: string | undefined | null): string {
    const font = getFont(fontSlug);
    return font.font.variable;
}
