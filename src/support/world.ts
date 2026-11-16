import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  homePage!: HomePage;
  loginPage!: LoginPage;
  productPage!: ProductPage;
  cartPage!: CartPage;
  cartConfirmationMessage?: string;

  constructor(options: IWorldOptions) {
    super(options);
  }

  initPages(page: Page): void {
    this.page = page;
    this.homePage = new HomePage(page);
    this.loginPage = new LoginPage(page);
    this.productPage = new ProductPage(page);
    this.cartPage = new CartPage(page);
  }
}

setWorldConstructor(CustomWorld);
