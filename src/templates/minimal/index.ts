/**
 * Default Theme Template
 *
 * Exports all page components for the default theme
 */

import { ThemeTemplate } from "@/lib/template-types";
import MinimalHome from "./home";
import MinimalSingleProject from "./single-project";

export const minimalTemplate: ThemeTemplate = {
    name: "Minimal",
    slug: "minimal",
    description: "Clean and professional default template",
    home: MinimalHome,
    "single-project": MinimalSingleProject,
};
