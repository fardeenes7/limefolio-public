/**
 * Default Theme Template
 *
 * Exports all page components for the default theme
 */

import { ThemeTemplate } from "@/lib/template-types";
import DefaultHome from "./home";
import DefaultSingleProject from "./single-project";

export const defaultTemplate: ThemeTemplate = {
    home: DefaultHome,
    "single-project": DefaultSingleProject,
};
