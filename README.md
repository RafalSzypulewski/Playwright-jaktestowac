# Playwright-jaktestowac

Playwright tests run automatically on GitHub Actions for every push and pull request to `main`.

## Test report

The latest Playwright HTML report (from the most recent push to `main`) is published to GitHub Pages:

👉 https://rafalszypulewski.github.io/Playwright-jaktestowac/

For pull request runs, download the `playwright-report` artifact from the Actions run page and open it with `npx playwright show-report <folder>`.

## Running tests locally

```bash
npm ci
npx playwright install --with-deps
npx playwright test
npx playwright show-report
```
