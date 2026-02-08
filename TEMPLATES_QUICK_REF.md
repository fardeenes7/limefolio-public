# Template System - Quick Reference

## 📁 File Structure

```
src/templates/
├── index.ts                    # Registry (add themes here)
├── default/                    # Default theme
│   ├── index.ts
│   ├── home.tsx
│   └── single-project.tsx
└── modern/                     # Modern theme (example)
    ├── index.ts
    ├── home.tsx
    └── single-project.tsx
```

## 🚀 Quick Start

### 1. Create Theme Components

```tsx
// src/templates/my-theme/home.tsx
import { PageProps } from "@/lib/template-types";

export default function MyThemeHome({ data }: PageProps) {
    return <div>{data.title}</div>;
}
```

### 2. Create Theme Index

```tsx
// src/templates/my-theme/index.ts
import { ThemeTemplate } from "@/lib/template-types";
import MyThemeHome from "./home";
import MyThemeSingleProject from "./single-project";

export const myThemeTemplate: ThemeTemplate = {
    home: MyThemeHome,
    "single-project": MyThemeSingleProject,
};
```

### 3. Register Theme

```tsx
// src/templates/index.ts
import { myThemeTemplate } from "./my-theme";

export const Templates: TemplateRegistry = {
    default: defaultTemplate,
    "my-theme": myThemeTemplate, // Add this
};
```

## 💡 Usage Examples

### In Pages

```tsx
import { getTemplate } from "@/templates";

const template = getTemplate(siteData.theme);
const HomeComponent = template.home;
return <HomeComponent data={siteData} />;
```

### Direct Access

```tsx
import { Templates } from "@/templates";

const theme = siteData.theme || "default";
return <Templates[theme].home data={siteData} />;
```

## 🎨 Available Themes

- `default` - Minimal default theme
- `modern` - Modern gradient theme

## 📋 Required Pages

Each theme must implement:

- `home` - Home/landing page
- `single-project` - Individual project page

## 🔧 API Format

```json
{
  "theme": "modern",
  "title": "My Portfolio",
  "description": "...",
  ...
}
```

## ⚡ Key Functions

```tsx
// Get template with fallback
getTemplate(themeId: string)

// Check if template exists
templateExists(themeId: string)

// Get all theme IDs
getAvailableThemes()
```

## 📝 Component Template

```tsx
import { PageProps } from "@/lib/template-types";

export default function ComponentName({ data }: PageProps) {
    return (
        <div>
            <h1>{data?.title || "Default Title"}</h1>
        </div>
    );
}
```

## ✅ Checklist for New Theme

- [ ] Create theme folder in `src/templates/`
- [ ] Create `home.tsx` component
- [ ] Create `single-project.tsx` component
- [ ] Create `index.ts` with ThemeTemplate export
- [ ] Import theme in `src/templates/index.ts`
- [ ] Add to Templates registry
- [ ] Test with API response

## 🐛 Common Issues

**Theme not loading?**

- Check theme ID matches exactly
- Verify import in `templates/index.ts`
- Check console for warnings

**Type errors?**

- Ensure component uses `PageProps`
- Check all required pages are implemented

**Fallback not working?**

- Use `getTemplate()` helper
- Ensure `default` theme exists
