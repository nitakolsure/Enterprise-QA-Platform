import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.page.locator('#cartur').click();
    await this.page.waitForURL('**/cart.html');
  }

  productTitle(productName: string): Locator {
    return this.page.locator('#tbodyid td').filter({ hasText: productName });
  }
}
