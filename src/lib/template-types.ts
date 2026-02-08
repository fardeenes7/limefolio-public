/**
 * Template Types
 *
 * Defines the structure for page templates.
 * Each theme must provide components for all required pages.
 */

import { ComponentType } from "react";

/**
 * Props that will be passed to all page components
 */
export interface PageProps {
    data: any; // Site data from API
}

/**
 * Template definition for a theme
 * Each theme must provide components for all these pages
 */
export interface ThemeTemplate {
    home: ComponentType<PageProps>;
    "single-project": ComponentType<PageProps>;
    // Add more page types as needed:
    // about: ComponentType<PageProps>;
    // contact: ComponentType<PageProps>;
    // blog: ComponentType<PageProps>;
}

/**
 * Template registry type
 * Maps theme IDs to their template components
 */
export type TemplateRegistry = {
    [themeId: string]: ThemeTemplate;
};
