import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('the customer selects the {string} category', async function (this: CustomWorld, category: string) {
  await this.homePage.selectCategory(category);
});

When(
  'the customer opens the product details for {string}',
  async function (this: CustomWorld, productName: string) {
    await this.homePage.openProduct(productName);
  }
);

Then(
  'the product details page should display {string}',
  async function (this: CustomWorld, productName: string) {
    await expect(this.productPage.productName).toBeVisible();
    await expect(this.productPage.productName).toHaveText(productName);
    await expect(this.productPage.addToCartButton).toBeVisible();
  }
);

When('the customer adds the current product to the shopping cart', async function (this: CustomWorld) {
  this.cartConfirmationMessage = await this.productPage.addToCart();
});

Then('the system should confirm that the product was added', async function (this: CustomWorld) {
  expect(this.cartConfirmationMessage).toMatch(/Product added/i);
});

When('the customer returns to the product catalog', async function (this: CustomWorld) {
  await this.homePage.open();
});

When('the customer navigates to the shopping cart', async function (this: CustomWorld) {
  await this.cartPage.open();
});

Then(
  'the shopping cart should contain {string}',
  async function (this: CustomWorld, productName: string) {
    await expect(this.cartPage.productTitle(productName).first()).toBeVisible();
  }
);
