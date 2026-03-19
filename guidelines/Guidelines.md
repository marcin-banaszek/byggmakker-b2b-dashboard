# Kesko Design System Guidelines

Use `@kesko/ds-react` components by default instead of custom local UI.

## General

- Prefer responsive layouts with flex/grid.
- Keep components presentational; fetch data in app-level files.
- Keep component APIs explicit and strongly typed.
- Use semantic tokens (`bg-solid-primary-base`, `text-text-neutral-base`) instead of hardcoded colors.

## Branding

- Apply one root theme class per app shell:
  - `.theme-k-rauta`
  - `.theme-k-bygg`
  - `.theme-byggmakker`
- Never mix theme classes in one screen.

## E-commerce rules

- Product listing cards must support:
  - base price
  - optional unit price
  - stock status
  - campaign badge
- Do not hide legal pricing information when `unitPrice` data is available.

## Accessibility

- Preserve focus styles on interactive controls.
- Buttons require clear action labels.
- Inputs need visible labels in composed forms.
