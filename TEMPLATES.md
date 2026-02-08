# Template System with Context & Hooks

## Overview

The LimeFolio template system now uses **React Context** and **hooks** for intelligent component management with automatic fallback to default theme components.

## Key Features

✅ **Context-based**: Theme name provided via `TemplateProvider`  
✅ **Hook-based**: Access components via `useTemplate()` hook  
✅ **Intelligent Fallback**: Missing components automatically use default theme  
✅ **Shadcn Colors**: All templates use shadcn color variables for consistency  
✅ **Mix & Match**: Combine any template with any color theme

## Architecture

```
Layout (Server)
  ↓
TemplateProvider (Client) - Provides theme name
  ↓
Page Component (Client)
  ↓
useTemplate() Hook - Returns components with fallback
  ↓
Template Components - Render with shadcn colors
```

## Usage

### 1. In Layout (Server Component)

```tsx
import { TemplateProvider } from "@/contexts/template-context";

export default async function Layout({ children }) {
    const siteData = await getSite(domain);
    const theme = siteData?.theme || "default";

    return <TemplateProvider theme={theme}>{children}</TemplateProvider>;
}
```

### 2. In Page Component (Client Component)

```tsx
"use client";

import { useTemplate } from "@/hooks/use-template";

export default function HomeClient({ data }) {
    const template = useTemplate();
    const HomeComponent = template.home;

    return <HomeComponent data={data} />;
}
```

### 3. Alternative: Use Specific Component

```tsx
"use client";

import { useTemplateComponent } from "@/hooks/use-template";

export default function Page({ data }) {
    const HomeComponent = useTemplateComponent("home");
    return <HomeComponent data={data} />;
}
```

## Intelligent Fallback

If a theme is missing a component, it automatically falls back to the default theme:

```tsx
// Theme "custom" doesn't have "single-project" component
const template = useTemplate(); // theme = "custom"

// template.home -> CustomHome (exists)
// template["single-project"] -> DefaultSingleProject (fallback!)
```

Console warning:

```
⚠️ Component "single-project" not found in theme "custom".
   Falling back to default theme.
```

## Shadcn Color System

All templates use shadcn color variables for consistency:

### Available Colors

- `bg-background` - Main background
- `text-foreground` - Main text color
- `bg-primary` - Primary brand color
- `text-primary-foreground` - Text on primary
- `bg-secondary` - Secondary color
- `text-muted-foreground` - Muted text
- `bg-accent` - Accent color
- `border-border` - Border color
- `bg-muted` - Muted background

### Example

```tsx
export default function MyComponent({ data }: PageProps) {
    return (
        <div className="bg-background text-foreground">
            <h1 className="text-primary">{data.title}</h1>
            <p className="text-muted-foreground">{data.description}</p>
            <button className="bg-primary text-primary-foreground">
                Click Me
            </button>
        </div>
    );
}
```

## Mix & Match: Templates + Themes

**Templates** = Layout & Structure  
**Themes** = Colors (via next-themes)

You can combine any template with any color theme:

| Template | Color Theme | Result                       |
| -------- | ----------- | ---------------------------- |
| default  | light       | Default layout, light colors |
| default  | dark        | Default layout, dark colors  |
| modern   | light       | Modern layout, light colors  |
| modern   | dark        | Modern layout, dark colors   |

## Adding a New Template

### Step 1: Create Components

```tsx
// src/templates/my-template/home.tsx
import { PageProps } from "@/lib/template-types";

export default function MyTemplateHome({ data }: PageProps) {
    return (
        <div className="bg-background text-foreground">
            <h1>{data.title}</h1>
        </div>
    );
}
```

### Step 2: Create Index

```tsx
// src/templates/my-template/index.ts
import { ThemeTemplate } from "@/lib/template-types";
import MyTemplateHome from "./home";
import MyTemplateSingleProject from "./single-project";

export const myTemplate: ThemeTemplate = {
    home: MyTemplateHome,
    "single-project": MyTemplateSingleProject,
};
```

### Step 3: Register

```tsx
// src/templates/index.ts
import { myTemplate } from "./my-template";

export const Templates: TemplateRegistry = {
    default: defaultTemplate,
    modern: modernTemplate,
    "my-template": myTemplate, // Add this
};
```

## Partial Templates

You can create a template with only some components:

```tsx
// Minimal template with only home page
export const minimalTemplate: ThemeTemplate = {
    home: MinimalHome,
    // "single-project" is missing - will use default!
};
```

When someone uses this template:

- `home` page → Uses `MinimalHome`
- `single-project` page → Automatically uses `DefaultSingleProject`

## API Integration

The backend returns a template name:

```json
{
    "theme": "modern",
    "title": "My Portfolio",
    "description": "Full-stack developer"
}
```

The system:

1. Receives `theme: "modern"`
2. Passes it to `TemplateProvider`
3. Components use `useTemplate()` to get modern components
4. Falls back to default if component missing

## Best Practices

### 1. Always Use Shadcn Colors

```tsx
// ✅ Good - Uses shadcn colors
<div className="bg-background text-foreground">

// ❌ Bad - Hardcoded colors
<div className="bg-white text-black dark:bg-black dark:text-white">
```

### 2. Handle Missing Data

```tsx
export default function Component({ data }: PageProps) {
    return <h1>{data?.title || "Default Title"}</h1>;
}
```

### 3. Use Client Components

```tsx
"use client"; // Required for useTemplate hook

import { useTemplate } from "@/hooks/use-template";
```

### 4. Provide All Components

Try to implement all required components:

- `home`
- `single-project`
- (more as you add them)

If you can't, the fallback system has you covered!

## Hooks Reference

### `useTemplate()`

Returns all template components with fallback:

```tsx
const template = useTemplate();
// Returns: { home: Component, "single-project": Component }
```

### `useTemplateComponent(key)`

Returns a specific component with fallback:

```tsx
const HomeComponent = useTemplateComponent("home");
```

### `useTemplateContext()`

Returns the current theme name:

```tsx
const { theme } = useTemplateContext();
// Returns: { theme: "modern" }
```

## Example: Complete Template

```tsx
// src/templates/portfolio/home.tsx
import { PageProps } from "@/lib/template-types";

export default function PortfolioHome({ data }: PageProps) {
    return (
        <div className="min-h-screen bg-background">
            <header className="border-b border-border">
                <h1 className="text-4xl font-bold text-foreground">
                    {data.title}
                </h1>
            </header>

            <main className="container mx-auto py-12">
                <p className="text-lg text-muted-foreground">
                    {data.description}
                </p>

                <button className="mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
                    View Projects
                </button>
            </main>
        </div>
    );
}
```

## Troubleshooting

### "useTemplateContext must be used within a TemplateProvider"

Make sure `TemplateProvider` wraps your component tree in the layout.

### Component not rendering

1. Check theme name matches exactly
2. Verify component is registered in `templates/index.ts`
3. Check console for fallback warnings

### Colors not working

1. Ensure you're using shadcn color variables
2. Check that `ThemeProvider` from next-themes is set up
3. Verify Tailwind CSS is configured correctly

## Summary

🎯 **Simple**: Use `useTemplate()` hook  
🔄 **Smart**: Automatic fallback to default  
🎨 **Consistent**: Shadcn colors everywhere  
⚡ **Flexible**: Mix templates with color themes  
📦 **Scalable**: Add 100+ templates easily

The system is production-ready and handles edge cases gracefully!
