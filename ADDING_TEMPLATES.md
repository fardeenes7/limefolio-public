# Adding New Templates

This guide explains how to add a new template to Limefolio.

## Quick Start

Adding a new template is a 3-step process:

### 1. Create Template Files

Create a new folder in `/public/src/templates/` with your template name (e.g., `minimal/`):

```
/public/src/templates/minimal/
├── index.ts
├── home.tsx
└── single-project.tsx
```

### 2. Create Template Components

**home.tsx** - The home page component:

```tsx
import { PageProps } from "@/lib/template-types";

export default function MinimalHome({ data }: PageProps) {
    return (
        <div className="min-h-screen bg-background">
            <h1>{data?.title || "Welcome"}</h1>
            {/* Your template design here */}
        </div>
    );
}
```

**single-project.tsx** - The single project page component:

```tsx
import { PageProps } from "@/lib/template-types";

export default function MinimalSingleProject({ data }: PageProps) {
    return (
        <div className="min-h-screen bg-background">
            <h1>{data?.project?.title || "Project"}</h1>
            {/* Your template design here */}
        </div>
    );
}
```

**index.ts** - Export the template with metadata:

```tsx
import { ThemeTemplate } from "@/lib/template-types";
import MinimalHome from "./home";
import MinimalSingleProject from "./single-project";

export const minimalTemplate: ThemeTemplate = {
    name: "Minimal",
    slug: "minimal",
    description: "A clean and minimal template",
    home: MinimalHome,
    "single-project": MinimalSingleProject,
};
```

### 3. Register the Template

Add your template to `/public/src/templates/index.ts`:

```typescript
import { minimalTemplate } from "./minimal";

export const Templates: TemplateRegistry = {
    default: defaultTemplate,
    modern: modernTemplate,
    minimal: minimalTemplate, // Add your template here
};
```

## That's It!

Your template will now:

- ✅ Automatically appear in the API at `/api/templates`
- ✅ Be available for use in the template selector
- ✅ Work with the template context system

## Testing Your Template

### 1. Check the API

```bash
curl http://localhost:3001/api/templates
```

You should see your template in the response:

```json
[
    {
        "name": "Minimal",
        "slug": "minimal",
        "description": "A clean and minimal template"
    }
]
```

### 2. Use the Template

In your pages, you can use the template like this:

```tsx
import { useTemplate } from "@/hooks/use-template";

export default function Page() {
    const { HomeComponent } = useTemplate();
    return <HomeComponent data={siteData} />;
}
```

## Template Structure

Each template must provide:

- **name** (string): Display name for the template
- **slug** (string): URL-friendly identifier
- **description** (string, optional): Brief description
- **home** (Component): Home page component
- **single-project** (Component): Single project page component

## Styling Guidelines

- Use **shadcn color variables** for theming (e.g., `bg-background`, `text-foreground`)
- This ensures your template works with all color themes
- Use Tailwind CSS for styling
- Make components responsive

## Example Color Variables

```tsx
// Background colors
className = "bg-background";
className = "bg-card";
className = "bg-muted";

// Text colors
className = "text-foreground";
className = "text-muted-foreground";
className = "text-primary";

// Borders
className = "border-border";
```

## Need Help?

- Check existing templates in `/public/src/templates/default/` or `/public/src/templates/modern/`
- Review the `ThemeTemplate` interface in `/public/src/lib/template-types.ts`
- See the documentation in `TEMPLATES_API.md`
