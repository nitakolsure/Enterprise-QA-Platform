import { After, AfterAll, Before, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { Browser, chromium } from '@playwright/test';
import { mkdirSync } from 'fs';
import { testConfig } from '../config/test.config';
import { CustomWorld } from './world';

setDefaultTimeout(60_000);

let browser: Browser;

Before(async function (this: CustomWorld) {
  const headed = this.parameters.headed === true || process.env.HEADED === 'true';

  if (!browser) {
    browser = await chromium.launch({ headless: !headed });
  }

  this.browser = browser;
  this.context = await browser.newContext({
    baseURL: testConfig.baseUrl,
    viewport: { width: 1280, height: 720 },
  });
  this.initPages(await this.context.newPage());
});

After(async function (this: CustomWorld, { result, pickle }) {
  if (result?.status === Status.FAILED && this.page) {
    mkdirSync('test-results', { recursive: true });
    const fileName = pickle.name.replace(/[^\w]+/g, '-').toLowerCase();
    await this.page.screenshot({
      path: `test-results/${fileName}.png`,
      fullPage: true,
    });
  }

  await this.context?.close();
});

AfterAll(async () => {
  await browser?.close();
});
