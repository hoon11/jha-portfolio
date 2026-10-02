# UI visual reference

The portfolio uses a cream background, restrained pastel accents, thin borders, a subtle grid, window-like panels, and limited decorative illustrations. [DESIGN.md](../DESIGN.md) is the canonical specification for content, behavior, and responsive rules.

## Responsive composition

- Desktop uses a left sidebar and multiple columns where the content fits.
- Tablet uses one top navigation and reduces illustration density.
- Mobile uses a compact header and menu, with content in one column.
- Keep the labeled language selector below desktop navigation, beside the brand above tablet navigation, and below the mobile brand/menu row. It remains visible when the mobile menu is closed.
- Check English, Japanese, and Korean at 1280, 1024, 768, 390, and 320px. Allow the tablet header two rows before compressing translated navigation labels.
- Layout and decoration adapt before any content is reduced. Career descriptions and Lab status remain visible at every width.

## Visual and interaction rules

- Keep UI text and controls as HTML. Illustrations are separate decorative assets.
- Treat window borders and dots as decoration, not controls.
- Use the semantic color roles and contrast rules in DESIGN.md.
- Keep supporting text readable, actions touch-friendly, and pages free of horizontal scrolling.
