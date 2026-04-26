import { Locator, Page, expect } from "@playwright/test";

export abstract class BasePage {
    protected abstract url: string;

    constructor(public page: Page) {}

    async goto(path: string = this.url) {
        await this.page.goto(path);
    }
}