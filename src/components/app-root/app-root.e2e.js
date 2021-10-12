"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@stencil/core/testing");
describe('app-root', () => {
    it('renders', async () => {
        const page = await (0, testing_1.newE2EPage)({ url: '/' });
        const element = await page.find('app-root');
        expect(element).toHaveClass('hydrated');
    });
    it('renders an ion-app', async () => {
        const page = await (0, testing_1.newE2EPage)({ url: '/' });
        const element = await page.find('app-root > ion-app');
        expect(element).toHaveClass('hydrated');
    });
});
