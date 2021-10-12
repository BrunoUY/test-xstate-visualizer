import { newE2EPage } from '@stencil/core/testing';

describe('app-payment-form', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<app-payment-form></app-payment-form>');
    const element = await page.find('app-payment-form');
    expect(element).toHaveClass('hydrated');
  });{cursor}
});
