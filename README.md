# Demoblaze Playwright BDD Framework

TypeScript + Playwright + Cucumber BDD + Page Object Model for [Demoblaze](https://www.demoblaze.com/).

## Scenario

```gherkin
Given user is logged in successfully
Then verify user is able to add to cart
```

Update credentials in `src/config/test.config.ts`.

## Run

The Cucumber runner config is `cucumber.ts`.

```bash
npm install
npx playwright install chromium
npm test
```

## Run by tag / profile

```powershell
npx cucumber-js --profile smoke
npx cucumber-js --profile cart
npx cucumber-js --tags '@smoke'
npx cucumber-js --tags '@smoke or @cart'
node run-by-tag.js smoke
```

Headed:

```powershell
npx cucumber-js --profile headed
```

HTML report: `cucumber-report/report.html`
