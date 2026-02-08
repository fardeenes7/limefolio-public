/**
 * Modern Theme Template
 *
 * Exports all page components for the modern theme
 */

import { ThemeTemplate } from "@/lib/template-types";
import ModernHome from "./home";
import ModernSingleProject from "./single-project";

export const modernTemplate: ThemeTemplate = {
    name: "Modern",
    slug: "modern",
    description: "Modern and dynamic template with contemporary design",
    home: ModernHome,
    "single-project": ModernSingleProject,
};
