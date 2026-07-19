# Modules

Each business module owns its `Application`, `Domain`, `Http`, and `Infrastructure` layers.

## Current bootstrap modules

- `Shared`
- `User`
- `Listing`
- `Match`
- `Message`
- `Moderation`

Add new modules in singular `PascalCase` and register their routes in `routes/api/v1`.
