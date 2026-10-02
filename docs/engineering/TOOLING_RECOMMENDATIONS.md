# Tooling Recommendations

The following tools are recommended to establish a production-ready baseline for this React/Vite project:

- **Type Checker:** TypeScript (migrate `.jsx` to `.tsx`).
- **Formatter:** Prettier (enforce consistent styling).
- **Test Framework:** Vitest (for unit tests) + React Testing Library (for component tests).
- **E2E Testing:** Playwright or Cypress.
- **Static Security Scan:** npm audit or Snyk.
- **CI Workflow:** GitHub Actions (lint -> test -> build).
- **Pre-commit Hooks:** Husky + lint-staged.

**Note:** No automated dependency installation was performed during scaffolding. Please review and install these as needed.
