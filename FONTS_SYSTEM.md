# Fonts System

This guide explains the fonts registry system in Limefolio.

## Overview

The fonts system provides a centralized way to manage and use Google Fonts across the application. It automatically exposes available fonts through an API endpoint.

## How It Works

1. **Fonts are registered** in `/public/src/lib/fonts.ts`
2. **API automatically exposes** them at `/api/fonts`
3. **Layout dynamically applies** the selected font from `siteData.font`

## Fonts Registry

All fonts are configured in `/public/src/lib/fonts.ts`:

```typescript
import { Figtree, Geist, Geist_Mono } from "next/font/google";

export const Fonts: Record<string, FontConfig> = {
    figtree: {
        name: "Figtree",
        slug: "figtree",
        variable: "--font-figtree",
        font: figtree,
    },
    "geist-sans": {
        name: "Geist Sans",
        slug: "geist-sans",
        variable: "--font-geist-sans",
        font: geistSans,
    },
    "geist-mono": {
        name: "Geist Mono",
        slug: "geist-mono",
        variable: "--font-geist-mono",
        font: geistMono,
    },
};
```

## API Endpoint

### Get Fonts List

**Endpoint:** `GET /api/fonts`

**Port:** 3001 (Next.js dev server)

**Authentication:** None (public endpoint)

**Response:**

```json
[
    {
        "name": "Figtree",
        "slug": "figtree",
        "variable": "--font-figtree"
    },
    {
        "name": "Geist Sans",
        "slug": "geist-sans",
        "variable": "--font-geist-sans"
    },
    {
        "name": "Geist Mono",
        "slug": "geist-mono",
        "variable": "--font-geist-mono"
    }
]
```

## Usage in Layout

The layout automatically applies the font from `siteData.font`:

```tsx
import { getFont, getAllFontVariables } from "@/lib/fonts";

const fontSlug = siteData?.font || "figtree";
const selectedFont = getFont(fontSlug);
const allFontVariables = getAllFontVariables();

return (
    <html lang="en" className={allFontVariables}>
        <body
            className={`antialiased font-${fontSlug}`}
            style={{
                fontFamily: `var(${selectedFont.variable})`,
            }}
        >
            {children}
        </body>
    </html>
);
```

## Adding a New Font

### 1. Import the Font

Add the font import in `/public/src/lib/fonts.ts`:

```typescript
import { Figtree, Geist, Geist_Mono, Inter } from "next/font/google";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});
```

### 2. Register the Font

Add it to the `Fonts` registry:

```typescript
export const Fonts: Record<string, FontConfig> = {
    // ... existing fonts
    inter: {
        name: "Inter",
        slug: "inter",
        variable: "--font-inter",
        font: inter,
    },
};
```

### 3. That's It!

The font will automatically:

- ✅ Appear in the API at `/api/fonts`
- ✅ Be available for selection in the dashboard
- ✅ Work with the layout system

## Helper Functions

### `getFont(fontSlug)`

Get font configuration by slug with fallback to figtree.

```typescript
const font = getFont("geist-sans");
// Returns: { name: "Geist Sans", slug: "geist-sans", variable: "--font-geist-sans", font: ... }
```

### `getFontMetadata()`

Get metadata for all fonts (used by API).

```typescript
const fonts = getFontMetadata();
// Returns: [{ name: "Figtree", slug: "figtree", variable: "--font-figtree" }, ...]
```

### `getAllFontVariables()`

Get all font CSS variables as a string.

```typescript
const variables = getAllFontVariables();
// Returns: "--font-figtree --font-geist-sans --font-geist-mono"
```

### `getFontClassName(fontSlug)`

Get the CSS variable for a specific font.

```typescript
const className = getFontClassName("figtree");
// Returns: "--font-figtree"
```

## Testing

### Test the API

```bash
curl http://localhost:3001/api/fonts
```

### Test in Browser

1. Update `siteData.font` to a different font slug
2. Reload the page
3. The font should change automatically

## Font Variables in CSS

All fonts are available as CSS variables:

```css
/* Figtree */
font-family: var(--font-figtree);

/* Geist Sans */
font-family: var(--font-geist-sans);

/* Geist Mono */
font-family: var(--font-geist-mono);
```

## Integration with Site Model

To fully integrate fonts with the site:

### 1. Add Font Field to Django Model

```python
# In /server/portfolios/models.py
class Site(models.Model):
    # ... existing fields
    font = models.CharField(max_length=50, default='figtree')
```

### 2. Update Serializers

```python
# In /server/portfolios/serializers.py
class SiteDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Site
        fields = [..., 'font']
```

### 3. Create Font Selector Component

Create a component in the dashboard to allow users to select fonts:

```tsx
import { useState, useEffect } from "react";

function FontSelector() {
    const [fonts, setFonts] = useState([]);

    useEffect(() => {
        fetch("/api/fonts")
            .then((res) => res.json())
            .then(setFonts);
    }, []);

    return (
        <select>
            {fonts.map((font) => (
                <option key={font.slug} value={font.slug}>
                    {font.name}
                </option>
            ))}
        </select>
    );
}
```

## Available Fonts

Currently registered fonts:

1. **Figtree** (Default)
    - Slug: `figtree`
    - Variable: `--font-figtree`
    - Modern, friendly sans-serif

2. **Geist Sans**
    - Slug: `geist-sans`
    - Variable: `--font-geist-sans`
    - Clean, technical sans-serif

3. **Geist Mono**
    - Slug: `geist-mono`
    - Variable: `--font-geist-mono`
    - Monospace font for code

## Notes

- All fonts are loaded from Google Fonts
- Font variables are applied to the `<html>` element
- The selected font is applied via inline styles on `<body>`
- Fallback font is always `figtree`
- The system supports adding unlimited fonts
