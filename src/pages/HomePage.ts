import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly logoutLink: Locator;
  readonly welcomeUser: Locator;

  constructor(page: Page) {
    super(page);
    this.logoutLink = page.locator('#logout2');
    this.welcomeUser = page.locator('#nameofuser');
  }

  async open(): Promise<void> {
    await this.goto('/');
    await this.page.locator('#tbodyid .card-title a').first().waitFor();
  }

  async openProduct(productName: string): Promise<void> {
    await this.page.getByRole('link', { name: productName, exact: true }).click();
  }
}
