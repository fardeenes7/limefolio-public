/**
 * Default Theme Template
 *
 * Exports all page components for the default theme
 */

import { ThemeTemplate } from "@/lib/template-types";
import DefaultHome from "./home";
import DefaultSingleProject from "./single-project";

export const defaultTemplate: ThemeTemplate = {
    name: "Default",
    slug: "default",
    description: "Clean and professional default template",
    home: DefaultHome,
    "single-project": DefaultSingleProject,
};
