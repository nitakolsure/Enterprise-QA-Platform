import { Given } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { testConfig } from '../config/test.config';
import { CustomWorld } from '../support/world';

Given('the Product Store application is launched', async function (this: CustomWorld) {
  await this.homePage.open();
});

Given('the customer is logged in with valid credentials', async function (this: CustomWorld) {
  const { username, password } = testConfig.credentials;

  await this.page.request.post('https://api.demoblaze.com/signup', {
    data: {
      username,
      password: Buffer.from(password).toString('base64'),
    },
  });

  await this.loginPage.login(username, password);

  await expect(this.homePage.welcomeUser).toBeVisible();
  await expect(this.homePage.welcomeUser).toHaveText(`Welcome ${username}`);
  await expect(this.homePage.logoutLink).toBeVisible();
});
