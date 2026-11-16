import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { testConfig } from '../config/test.config';
import { CustomWorld } from '../support/world';

Given('user is logged in successfully', async function (this: CustomWorld) {
  const { username, password } = testConfig.credentials;

  await this.page.request.post('https://api.demoblaze.com/signup', {
    data: {
      username,
      password: Buffer.from(password).toString('base64'),
    },
  });

  await this.homePage.open();
  await this.loginPage.login(username, password);

  await expect(this.homePage.welcomeUser).toBeVisible();
  await expect(this.homePage.welcomeUser).toHaveText(`Welcome ${username}`);
  await expect(this.homePage.logoutLink).toBeVisible();
});

Then('verify user is able to add to cart', async function (this: CustomWorld) {
  const { productName } = testConfig;

  await this.homePage.open();
  await this.homePage.openProduct(productName);
  await expect(this.productPage.productName).toHaveText(productName);

  const message = await this.productPage.addToCart();
  expect(message).toMatch(/Product added/i);

  await this.cartPage.open();
  await expect(this.cartPage.productTitle(productName).first()).toBeVisible();
});
