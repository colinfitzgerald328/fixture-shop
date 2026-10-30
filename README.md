# fixture-shop

A small storefront used to test [gatecheck](https://github.com/colinfitzgerald328/gatecheck). It isn't meant to run.

- `web/`: React frontend on the LaunchDarkly React SDK
- `api/`: Express API on the LaunchDarkly Node server SDK
- `migrations/`: SQL, for `outside-projection` cases

Each branch is a test PR against `main`:

| Group | Meaning |
|---|---|
| `pass/*` | Correctly gated. gatecheck should report nothing. |
| `leak/*` | One planted leak. |
| `edge/*` | Hard cases: refactors, flags passed as props, formatting churn. |
| `ai/*` | Features Claude built with the gatecheck plugin off, labeled by hand. |
