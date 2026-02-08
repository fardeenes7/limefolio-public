/**
 * Legacy themes export for backward compatibility
 * Now uses the ColorThemes registry
 */
import { getColorThemeMetadata } from "./color-themes";

export const themes = getColorThemeMetadata().map((theme) => ({
    name: theme.name,
    value: theme.slug,
}));
