# ProductCard

## Use

`ProductCard` is the default listing card for K-Rauta-style ecommerce grids and carousels.

## Required fields

- `title`
- `imageUrl`
- `price`

## Optional but recommended

- `brandName`
- `unit` (`kpl`, `pkt`, `m²`)
- `unitPrice` + `unitPriceLabel`
- `inStock`
- `badgeLabel`

## Rules

- If `unitPrice` is known, provide both `unitPrice` and `unitPriceLabel`.
- Keep stock text visible; do not hide stock state behind hover interactions.
- Use `badgeLabel` for campaign states like `Kampanja` or `Uutuus`.
