# Template System - Visual Guide

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     API Response                             │
│  { theme: "modern", title: "Portfolio", ... }               │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              Layout (Server Component)                       │
│  - Fetches site data from API                               │
│  - Extracts theme: "modern"                                 │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│         TemplateProvider (Client Component)                  │
│  <TemplateProvider theme="modern">                          │
│    Provides theme name via React Context                    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│           Page Component (Client)                            │
│  const template = useTemplate()                             │
│  - Reads theme from context: "modern"                       │
│  - Looks up Templates["modern"]                             │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              Template Registry                               │
│  Templates = {                                              │
│    default: { home, single-project },                       │
│    modern: { home, single-project }                         │
│  }                                                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│         Component with Fallback Logic                        │
│                                                             │
│  ┌─────────────────────────────────────┐                   │
│  │ Is Templates["modern"].home exists? │                   │
│  └──────────┬──────────────────────────┘                   │
│             │                                               │
│      ┌──────┴──────┐                                       │
│      │             │                                        │
│     YES           NO                                        │
│      │             │                                        │
│      ▼             ▼                                        │
│  ModernHome   DefaultHome                                   │
│  (use it)     (fallback!)                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│         Rendered Component (with shadcn colors)              │
│  <div className="bg-background text-foreground">            │
│    <h1 className="text-primary">...</h1>                    │
│  </div>                                                     │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

```
API
 │
 └─► Layout
      │
      └─► TemplateProvider (theme="modern")
           │
           └─► useTemplate() hook
                │
                ├─► Check Templates["modern"]
                │    │
                │    ├─► home exists? → ModernHome
                │    └─► single-project exists? → ModernSingleProject
                │
                └─► If missing → DefaultComponent (fallback)
```

## Component Hierarchy

```
<html>
  <body>
    <ThemeProvider>              ← next-themes (light/dark)
      <TemplateProvider>         ← Our context (template name)
        <Page>
          <HomeClient>           ← Uses useTemplate()
            <ModernHome />       ← Actual template component
          </HomeClient>
        </Page>
      </TemplateProvider>
    </ThemeProvider>
  </body>
</html>
```

## Fallback Decision Tree

```
useTemplate() called
    │
    ▼
Get theme from context
    │
    ▼
Does Templates[theme] exist?
    │
    ├─► NO → Use Templates["default"]
    │         └─► Return all default components
    │
    └─► YES → For each component:
              │
              ├─► home
              │    │
              │    ├─► Exists in theme? → Use theme component
              │    └─► Missing? → Use default component ⚠️
              │
              └─► single-project
                   │
                   ├─► Exists in theme? → Use theme component
                   └─► Missing? → Use default component ⚠️
```

## Example Scenarios

### Scenario 1: Complete Theme

```
API: { theme: "modern" }
Templates: {
  modern: { home: ✅, single-project: ✅ }
}

Result:
  home → ModernHome
  single-project → ModernSingleProject
```

### Scenario 2: Partial Theme

```
API: { theme: "minimal" }
Templates: {
  minimal: { home: ✅, single-project: ❌ }
}

Result:
  home → MinimalHome
  single-project → DefaultSingleProject ⚠️

Console: "Component 'single-project' not found in theme 'minimal'"
```

### Scenario 3: Missing Theme

```
API: { theme: "nonexistent" }
Templates: {
  nonexistent: ❌
}

Result:
  home → DefaultHome ⚠️
  single-project → DefaultSingleProject ⚠️

Console: "Theme 'nonexistent' not found. Using default theme."
```

### Scenario 4: No Theme Specified

```
API: { theme: null }

Result:
  home → DefaultHome
  single-project → DefaultSingleProject
```

## Color System

```
┌──────────────────────────────────────────────────────┐
│              Shadcn Color Variables                   │
├──────────────────────────────────────────────────────┤
│                                                       │
│  background ──────► Main background color            │
│  foreground ──────► Main text color                  │
│                                                       │
│  primary ─────────► Brand color                      │
│  primary-foreground ► Text on primary                │
│                                                       │
│  secondary ───────► Secondary color                  │
│  muted ───────────► Muted backgrounds                │
│  muted-foreground ► Subtle text                      │
│                                                       │
│  accent ──────────► Accent highlights                │
│  accent-foreground ► Text on accent                  │
│                                                       │
│  border ──────────► Border color                     │
│  input ───────────► Input borders                    │
│                                                       │
└──────────────────────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────────────┐
│         Applied via Tailwind Classes                  │
├──────────────────────────────────────────────────────┤
│  bg-background, text-foreground                      │
│  bg-primary, text-primary-foreground                 │
│  bg-muted, text-muted-foreground                     │
│  border-border, etc.                                 │
└──────────────────────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────────────┐
│      Works with next-themes (light/dark)             │
├──────────────────────────────────────────────────────┤
│  Light mode: Uses light color values                 │
│  Dark mode: Uses dark color values                   │
│  (Automatically switches via CSS variables)          │
└──────────────────────────────────────────────────────┘
```

## Template + Theme Combinations

```
┌─────────────┬──────────────┬──────────────┐
│  Template   │ Color Theme  │   Result     │
├─────────────┼──────────────┼──────────────┤
│  default    │   light      │  Default +   │
│             │              │  Light       │
├─────────────┼──────────────┼──────────────┤
│  default    │   dark       │  Default +   │
│             │              │  Dark        │
├─────────────┼──────────────┼──────────────┤
│  modern     │   light      │  Modern +    │
│             │              │  Light       │
├─────────────┼──────────────┼──────────────┤
│  modern     │   dark       │  Modern +    │
│             │              │  Dark        │
└─────────────┴──────────────┴──────────────┘

Template = Structure/Layout
Theme = Colors (light/dark)
Both are independent!
```

## Hook Usage Flow

```
Component calls useTemplate()
    │
    ▼
useTemplateContext()
    │
    └─► Get theme from context
         │
         ▼
buildTemplateWithFallbacks(theme)
    │
    ├─► For each required component:
    │    │
    │    └─► getComponentWithFallback(theme, key)
    │         │
    │         ├─► Try Templates[theme][key]
    │         │    │
    │         │    ├─► Found? Return it
    │         │    └─► Not found? ⚠️ Return Templates.default[key]
    │         │
    │         └─► Return component
    │
    └─► Return complete template object
         │
         └─► { home: Component, single-project: Component }
```

## File Organization

```
templates/
│
├── index.ts ─────────────► Registry (Maps theme → components)
│
├── default/ ─────────────► Fallback theme
│   ├── index.ts
│   ├── home.tsx ────────► Default home component
│   └── single-project.tsx ► Default project component
│
├── modern/ ──────────────► Modern theme
│   ├── index.ts
│   ├── home.tsx ────────► Modern home component
│   └── single-project.tsx ► Modern project component
│
└── [your-theme]/ ────────► Your custom theme
    ├── index.ts
    ├── home.tsx ────────► Your home component
    └── single-project.tsx ► Your project component (optional!)
                             If missing, uses default ✅
```

## Quick Reference

```
┌────────────────────────────────────────────────────┐
│  What                 │  Where                     │
├───────────────────────┼────────────────────────────┤
│  Provide theme        │  Layout + TemplateProvider │
│  Access theme         │  useTemplateContext()      │
│  Get components       │  useTemplate()             │
│  Get one component    │  useTemplateComponent()    │
│  Add new template     │  templates/[name]/         │
│  Register template    │  templates/index.ts        │
│  Fallback logic       │  hooks/use-template.ts     │
│  Color variables      │  Shadcn (bg-*, text-*)     │
└────────────────────────────────────────────────────┘
```

This visual guide should help you understand how everything connects! 🎨
