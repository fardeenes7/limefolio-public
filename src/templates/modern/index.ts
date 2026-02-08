/**
 * Modern Theme Template
 *
 * Exports all page components for the modern theme
 */

import { ThemeTemplate } from "@/lib/template-types";
import ModernHome from "./home";
import ModernSingleProject from "./single-project";

export const modernTemplate: ThemeTemplate = {
    home: ModernHome,
    "single-project": ModernSingleProject,
};
