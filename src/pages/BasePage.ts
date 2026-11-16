import { Page } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path = '/'): Promise<void> {
    await this.page.goto(path);
  }

  async acceptNextDialog(): Promise<string> {
    const dialog = await this.page.waitForEvent('dialog');
    const message = dialog.message();
    await dialog.accept();
    return message;
  }
}
