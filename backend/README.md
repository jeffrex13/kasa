# Project Aether Backend API

Laravel 13 API service for Project Aether.

## Goals of This Bootstrap

- API-first backend (no server-rendered Laravel UI scaffolding).
- Versioned routes under `/api/v1/*`.
- Module-oriented app structure for team scaling.
- Shared coding standards enforced through Laravel Pint.

## Quick Start

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

## Team Scripts

```bash
composer run dev      # Serve API locally
composer run test     # Run test suite
composer run test:phpunit
composer run test:pest
composer run test:ci  # CI-friendly test command
composer run lint     # Check code formatting (no writes)
composer run format   # Auto-format PHP code
```

## Test Harness

- `.env.testing` is committed for deterministic test bootstrapping.
- PHPUnit config is in `phpunit.xml` with fail-on-warning/risky enabled.
- Pest base setup is in `tests/Pest.php`.
- Smoke tests currently cover health and auth route skeleton behavior.

## Project Naming Conventions

- App display name: `Project Aether API`.
- API prefix: `/api/v1`.
- Route names: `api.v1.<module>.<action>`.
- Module folders use `PascalCase` singular naming (`User`, `Listing`, `Match`).
- Controller classes end with `Controller`.
- Request/Response DTOs and actions should be explicit (`CreateListingAction`, `UpdateProfileRequest`).

## Folder Conventions

### `app/Modules/<Module>/`

- `Application/`: use-cases, actions, command/query handlers.
- `Domain/`: entities, value objects, domain services, contracts.
- `Http/Controllers/`: transport layer controllers.
- `Infrastructure/Persistence/`: Eloquent models, repositories, mappers.

### `routes/api/v1/*.php`

Route files are split per module to keep endpoint ownership clear and avoid a monolithic route file.

## Bootstrap Endpoints

- `GET /up`: framework health route.
- `GET /health`: lightweight app liveness probe.
- `GET /ready`: readiness probe with DB connectivity check.
- `GET /api/v1/meta/ping`: API liveness payload.
- `POST /api/v1/auth/register`: create account and send OTP to email + mobile.
- `POST /api/v1/auth/login`: send OTP to email + mobile for existing account.
- `POST /api/v1/auth/verify-otp`: verify OTP and issue Sanctum token.
- `POST /api/v1/auth/logout`: revoke current Sanctum token.

## Baseline Rules

- Keep modules decoupled: cross-module access via contracts/actions, not direct model coupling by default.
- Place business logic in module `Application`/`Domain`, not controllers.
- Keep controller methods thin (input validation, orchestration, response mapping).
- Add tests for every new endpoint and domain behavior.
