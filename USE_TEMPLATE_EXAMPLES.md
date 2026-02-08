# useTemplate Hook - Usage Examples

## ✨ New Simplified Syntax

You can now destructure components directly from `useTemplate()`:

```tsx
const { HomeComponent } = useTemplate();
```

## 📚 All Usage Patterns

### 1. Destructured (Recommended) ⭐

```tsx
"use client";
import { useTemplate } from "@/hooks/use-template";

export default function Page({ data }) {
    const { HomeComponent } = useTemplate();
    return <HomeComponent data={data} />;
}
```

### 2. Multiple Components

```tsx
"use client";
import { useTemplate } from "@/hooks/use-template";

export default function Page({ data }) {
    const { HomeComponent, SingleProjectComponent } = useTemplate();

    return (
        <div>
            <HomeComponent data={data} />
            <SingleProjectComponent data={data.project} />
        </div>
    );
}
```

### 3. Single Component Hook

```tsx
"use client";
import { useTemplateComponent } from "@/hooks/use-template";

export default function Page({ data }) {
    const HomeComponent = useTemplateComponent("home");
    return <HomeComponent data={data} />;
}
```

### 4. Raw Template Object

```tsx
"use client";
import { useTemplateRaw } from "@/hooks/use-template";

export default function Page({ data }) {
    const template = useTemplateRaw();
    return <template.home data={data} />;
}
```

### 5. Conditional Rendering

```tsx
"use client";
import { useTemplate } from "@/hooks/use-template";

export default function Page({ data, pageType }) {
    const { HomeComponent, SingleProjectComponent } = useTemplate();

    if (pageType === "project") {
        return <SingleProjectComponent data={data} />;
    }

    return <HomeComponent data={data} />;
}
```

## 🎯 Available Components

After destructuring, you get:

```tsx
const {
    HomeComponent, // Home page component
    SingleProjectComponent, // Single project page component
    // More will be added as you add page types
} = useTemplate();
```

## 🔧 Type Safety

All components are fully typed:

```tsx
import { TemplateComponents } from "@/hooks/use-template";

const components: TemplateComponents = useTemplate();
// TypeScript knows all available components!
```

## 📝 Complete Example

```tsx
"use client";

import { useTemplate } from "@/hooks/use-template";

interface PageProps {
    data: {
        title: string;
        description: string;
        projects: any[];
    };
}

export default function HomePage({ data }: PageProps) {
    // ✨ Simple destructuring
    const { HomeComponent } = useTemplate();

    // Render with data
    return <HomeComponent data={data} />;
}
```

## 🆚 Before vs After

### Before

```tsx
const template = useTemplate();
const HomeComponent = template.home;
return <HomeComponent data={data} />;
```

### After ✨

```tsx
const { HomeComponent } = useTemplate();
return <HomeComponent data={data} />;
```

Much cleaner! 🎉

## 🚀 Adding New Page Types

When you add a new page type:

1. **Add to ThemeTemplate interface**:

```tsx
// src/lib/template-types.ts
export interface ThemeTemplate {
    home: ComponentType<PageProps>;
    "single-project": ComponentType<PageProps>;
    about: ComponentType<PageProps>; // ← Add this
}
```

2. **Add to TemplateComponents interface**:

```tsx
// src/hooks/use-template.ts
export interface TemplateComponents {
    HomeComponent: ComponentType<PageProps>;
    SingleProjectComponent: ComponentType<PageProps>;
    AboutComponent: ComponentType<PageProps>; // ← Add this
}
```

3. **Add to useTemplate return**:

```tsx
export function useTemplate(): TemplateComponents {
    const { theme } = useTemplateContext();
    const template = buildTemplateWithFallbacks(theme);

    return {
        HomeComponent: template.home,
        SingleProjectComponent: template["single-project"],
        AboutComponent: template.about, // ← Add this
    };
}
```

4. **Use it**:

```tsx
const { AboutComponent } = useTemplate();
return <AboutComponent data={data} />;
```

## 💡 Pro Tips

### Tip 1: Rename on Destructure

```tsx
const { HomeComponent: Home } = useTemplate();
return <Home data={data} />;
```

### Tip 2: Default Values

```tsx
const { HomeComponent = DefaultHome } = useTemplate();
// If HomeComponent is undefined, use DefaultHome
```

### Tip 3: Spread All Components

```tsx
const components = useTemplate();
// Pass all components to a child
<Layout components={components} />;
```

## 🎨 Real-World Example

```tsx
"use client";

import { useTemplate } from "@/hooks/use-template";
import { useParams } from "next/navigation";

export default function DynamicPage({ data }) {
    const params = useParams();
    const { HomeComponent, SingleProjectComponent } = useTemplate();

    // Render different components based on route
    if (params.projectId) {
        return <SingleProjectComponent data={data} />;
    }

    return <HomeComponent data={data} />;
}
```

## 📊 Summary

| Method       | Syntax                                                  | Use Case                |
| ------------ | ------------------------------------------------------- | ----------------------- |
| Destructured | `const { HomeComponent } = useTemplate()`               | ⭐ Recommended          |
| Multiple     | `const { HomeComponent, SingleProjectComponent } = ...` | Multiple pages          |
| Single       | `useTemplateComponent("home")`                          | One specific component  |
| Raw          | `useTemplateRaw()`                                      | Need original structure |

The destructured syntax is the cleanest and most intuitive! 🎉
