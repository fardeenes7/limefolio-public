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
    description:
        "Typography-first layout with ample whitespace and a refined reading experience.",
    tags: ["Minimal", "Typography", "Content-first"],
    home: MinimalHome,
    "single-project": MinimalSingleProject,
};
