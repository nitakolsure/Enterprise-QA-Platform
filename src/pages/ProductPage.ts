import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  readonly productName: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.locator('.name');
    this.addToCartButton = page.getByRole('link', { name: 'Add to cart' });
  }

  async addToCart(): Promise<string> {
    const dialogPromise = this.acceptNextDialog();
    await this.addToCartButton.click();
    return dialogPromise;
  }
}
